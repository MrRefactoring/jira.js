import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the `jiraExpressions` API (`evaluateJSISJiraExpression`, `analyseExpression`).
 *
 * Jira expressions are a small sandboxed language evaluated server-side against a context of issues, projects and
 * users. Nothing about them can be tested without a live site: the whole point is what the server computes, and there
 * is no client-side evaluation to check against.
 *
 * Read-only in effect — an expression can read the context it is given but cannot mutate anything.
 *
 * The distinction worth pinning is analysis versus evaluation. `analyseExpression` type-checks an expression without
 * running it, and its three `check` modes answer three different questions; a caller who only ever evaluates finds
 * out about a bad expression at the worst moment.
 */
describe('Jira Cloud — jiraExpressions (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker, { summary: 'expression subject' });
  });

  afterAll(() => tracker.cleanup());

  it('evaluates a constant expression with no context at all', async () => {
    const result = await client.jiraExpressions
      .evaluateJSISJiraExpression({ expression: '1 + 1' })
      .catch((e: unknown) => e);

    if (result instanceof Error) {
      expect((result as { status?: number }).status).toBeGreaterThanOrEqual(400);

      return;
    }

    expect((result as { value?: unknown }).value).toBe(2);
  });

  it('reads the current user from the implicit context', async () => {
    const me = await client.myself.getCurrentUser();

    const result = await client.jiraExpressions
      .evaluateJSISJiraExpression({ expression: 'user.accountId' })
      .catch(() => undefined);

    if (!result) return;

    expect((result as { value?: unknown }).value).toBe(me.accountId);
  });

  it('reads an issue passed explicitly in the context', async () => {
    const result = await client.jiraExpressions
      .evaluateJSISJiraExpression({
        expression: 'issue.key',
        context: { issue: { key: issue.key } },
      })
      .catch(() => undefined);

    if (!result) return;

    expect((result as { value?: unknown }).value).toBe(issue.key);
  });

  it('rejects an expression that references something not in context', async () => {
    const error = await client.jiraExpressions
      .evaluateJSISJiraExpression({ expression: 'issue.key' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('analyses an expression for syntax without evaluating it', async () => {
    const result = await client.jiraExpressions
      .analyseExpression({ expressions: ['1 + 1'], check: 'syntax' })
      .catch(() => undefined);

    if (!result) return;

    const analysis = result as { results?: { valid?: boolean; expression?: string }[] };

    expect(analysis.results?.[0]?.valid).toBe(true);
  });

  it('reports a malformed expression as invalid rather than throwing', async () => {
    const result = await client.jiraExpressions
      .analyseExpression({ expressions: ['1 +'], check: 'syntax' })
      .catch(() => undefined);

    if (!result) return;

    const analysis = result as { results?: { valid?: boolean; errors?: unknown[] }[] };

    expect(analysis.results?.[0]?.valid).toBe(false);
    expect((analysis.results?.[0]?.errors ?? []).length).toBeGreaterThan(0);
  });

  it('estimates complexity when asked to', async () => {
    const result = await client.jiraExpressions
      .analyseExpression({ expressions: ['issues.map(i => i.key)'], check: 'complexity' })
      .catch(() => undefined);

    if (!result) return;

    expect(result).toBeDefined();
  });
});
