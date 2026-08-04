import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError, isScopeError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';
import { testName } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

/**
 * The issue lifecycle, end to end.
 *
 * These assert the *contract* rather than that a call resolves: that what the Zod models declare is what arrives, that
 * a mutation is observable on the next read, that query parameters have an effect, and that a deleted issue surfaces
 * as a typed `NotFoundError` rather than an untyped rejection.
 */
describe('issue lifecycle', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issue: TestIssue;

  beforeAll(async () => {
    client = getCloudClient();
    issue = await createTestIssue(client, tracker, { summary: testName('lifecycle') });
  });

  afterAll(() => tracker.cleanup());

  it('creates an issue shaped as CreatedIssue declares', () => {
    expect(issue.id).toMatch(/^\d+$/);
    expect(issue.key).toMatch(new RegExp(`^${TEST_PROJECT_KEY}-\\d+$`));
  });

  it('reads it back by key and by id alike', async () => {
    const byKey = await client.issues.getIssue({ issueIdOrKey: issue.key });
    const byId = await client.issues.getIssue({ issueIdOrKey: issue.id });

    expect(byKey.id).toBe(issue.id);
    expect(byId.key).toBe(issue.key);
  });

  it('makes an edit observable on the next read', async () => {
    const summary = testName('edited');

    await client.issues.editIssue({ issueIdOrKey: issue.key, fields: { summary } });

    const fetched = await client.issues.getIssue({ issueIdOrKey: issue.key });

    expect((fetched.fields as { summary?: string }).summary).toBe(summary);
  });

  it('honours the fields parameter instead of returning everything', async () => {
    const trimmed = await client.issues.getIssue({ issueIdOrKey: issue.key, fields: ['summary'] });
    const fields = Object.keys(trimmed.fields ?? {});

    expect(fields).toContain('summary');
    expect(fields.length).toBeLessThan(10);
  });

  it('finds the issue through JQL once indexing catches up', async () => {
    const found = await waitFor(
      () => client.issueSearch.searchAndReconsileIssuesUsingJql({ jql: `key = ${issue.key}`, maxResults: 1 }),
      result => (result.issues?.length ?? 0) > 0,
    );

    expect(found.issues?.[0]?.id).toBe(issue.id);
  });

  it('surfaces a missing issue as NotFoundError', async () => {
    const error = await client.issues
      .getIssue({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
    expect(isScopeError(error)).toBe(false);
  });

  it('rejects an unknown project with a typed error rather than a hang', async () => {
    const error = await client.issues
      .createIssue({
        fields: { project: { key: 'NOSUCHPROJ' }, issuetype: { name: 'Task' }, summary: 'x' },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
