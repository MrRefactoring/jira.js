import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { AgileClient } from '#/agile/createAgileClient';
import { getAgileClient, getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestBoard, createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the Agile `issue` API (`getIssue`, `rankIssues`, `getIssueEstimationForBoard`,
 * `estimateIssueForBoard`).
 *
 * The same issues as the platform API, seen through the Agile lens — which is the interesting part. `getIssue` here
 * is a *different endpoint* from `issues.getIssue`, returning the same issue with board-specific fields attached, and
 * a caller who reaches for the wrong one gets something that looks right and is missing what they needed.
 *
 * Ranking is the other half. Rank is a field no ordinary write touches: it is manipulated only through `rankIssues`,
 * relative to another issue, and it is what a board's ordering actually is.
 */
describe('Jira Software — issue (live)', () => {
  const tracker = new ResourceTracker();
  let agile: AgileClient;
  let boardId: number;
  let first: TestIssue;
  let second: TestIssue;

  beforeAll(async () => {
    agile = getAgileClient();

    const cloud = getCloudClient();
    const boards = await agile.board.getAllBoards({ projectKeyOrId: TEST_PROJECT_KEY, type: 'scrum', maxResults: 1 });

    boardId = boards.values?.[0]?.id ?? (await createTestBoard(cloud, agile, tracker)).id;

    first = await createTestIssue(cloud, tracker, { summary: 'rank first' });
    second = await createTestIssue(cloud, tracker, { summary: 'rank second' });
  });

  afterAll(() => tracker.cleanup());

  it('returns the issue with the Agile fields the platform endpoint omits', async () => {
    const issue = await agile.issue.getIssue({ issueIdOrKey: first.key });

    expect(issue.id).toBe(first.id);
    expect(issue.key).toBe(first.key);

    const fields = issue.fields as Record<string, unknown>;

    // The board's rank field arrives as a custom field on this endpoint and is
    // absent from the platform one unless asked for by id.
    expect(Object.keys(fields).some(field => field.startsWith('customfield_'))).toBe(true);
  });

  it('agrees with the platform endpoint on the fields they share', async () => {
    const viaAgile = await agile.issue.getIssue({ issueIdOrKey: first.key });
    const viaPlatform = await getCloudClient().issues.getIssue({ issueIdOrKey: first.key });

    expect(viaAgile.id).toBe(viaPlatform.id);
    // Two endpoints, one issue — a difference here would mean one of the two
    // surfaces is reading something else entirely.
    expect((viaAgile.fields as { summary?: string }).summary).toBe(
      (viaPlatform.fields as { summary?: string }).summary,
    );
  });

  it('ranks one issue after another', async () => {
    await agile.issue.rankIssues({ issues: [second.key], rankAfterIssue: first.key });

    const ranked = await agile.issue.getIssue({ issueIdOrKey: second.key });

    // The call answers with no body at all, so the only proof it landed is that
    // the request was accepted and the issue still reads back intact.
    expect(ranked.key).toBe(second.key);
  });

  it('ranks one issue before another, answering with nothing at all', async () => {
    const result = await agile.issue.rankIssues({ issues: [second.key], rankBeforeIssue: first.key });

    // 204, so the declared return type resolves to `undefined`. Every ranking
    // call is write-only: there is no response to check and no way to learn the
    // resulting order except by reading the board back.
    expect(result).toBeUndefined();
  });

  it('accepts ranking an issue relative to itself rather than refusing it', async () => {
    // A no-op that reads like a bug and is silently allowed. Worth pinning
    // because the intuitive guess is a 400, and code that relies on one to
    // catch a self-reference will never see it.
    const result = await agile.issue.rankIssues({ issues: [first.key], rankAfterIssue: first.key });

    expect(result).toBeUndefined();
  });

  it('reports the estimation for the board, or none when the board sets no field', async () => {
    const estimation = await agile.issue
      .getIssueEstimationForBoard({ issueIdOrKey: first.key, boardId })
      .catch((e: unknown) => e);

    if (estimation instanceof Error) {
      expect((estimation as { status?: number }).status).toBeGreaterThanOrEqual(400);

      return;
    }

    // `fieldId` says which field the board treats as the estimate — story
    // points on one board, original estimate on another. The value is
    // meaningless without it.
    expect(typeof (estimation as { fieldId?: string }).fieldId).toBe('string');
  });

  it('surfaces a missing issue as a typed NotFoundError', async () => {
    const error = await agile.issue
      .getIssue({ issueIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
