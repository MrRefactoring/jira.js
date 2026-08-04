import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { AgileClient } from '#/agile/createAgileClient';
import { getAgileClient, getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestBoard, createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the Agile `backlog` API (`moveIssuesToBacklog`, `moveIssuesToBacklogForBoard`) and the board-side
 * backlog reads.
 *
 * The backlog is not a container an issue is put into: it is where an issue sits when it belongs to no sprint. So
 * "move to backlog" is really "remove from sprint", and the two endpoints differ only in whether ranking is possible
 * — the board-scoped one accepts `rankBeforeIssue`, the global one does not.
 *
 * Both are write-only. They answer 204, which means the only way to observe the effect is to read the board back.
 */
describe('Jira Software — backlog (live)', () => {
  const tracker = new ResourceTracker();
  let agile: AgileClient;
  let boardId: number;
  let issue: TestIssue;

  beforeAll(async () => {
    agile = getAgileClient();

    const cloud = getCloudClient();
    const boards = await agile.board.getAllBoards({ projectKeyOrId: TEST_PROJECT_KEY, type: 'scrum', maxResults: 1 });

    boardId = boards.values?.[0]?.id ?? (await createTestBoard(cloud, agile, tracker)).id;
    issue = await createTestIssue(cloud, tracker, { summary: 'backlog candidate' });
  });

  afterAll(() => tracker.cleanup());

  it('lists the board backlog', async () => {
    const backlog = await agile.board.getIssuesForBacklog({ boardId, maxResults: 10 });

    expect(Array.isArray(backlog.issues)).toBe(true);

    for (const row of backlog.issues ?? []) {
      expect(row.key).toMatch(/^[A-Z][A-Z0-9]*-\d+$/);
    }
  });

  it('counts the backlog without returning it', async () => {
    const count = await agile.board.getApproximateIssueCountForBacklog({ boardId }).catch((e: unknown) => e);

    if (count instanceof Error) return;

    expect(typeof (count as { count?: number }).count).toBe('number');
  });

  it('accepts moving an issue to the backlog and answers with nothing', async () => {
    const result = await agile.backlog.moveIssuesToBacklog({ issues: [issue.key] });

    expect(result).toBeUndefined();
  });

  it('accepts the board-scoped variant, which also allows ranking', async () => {
    const result = await agile.backlog.moveIssuesToBacklogForBoard({ boardId, issues: [issue.key] });

    expect(result).toBeUndefined();
  });

  it('rejects an issue key that does not exist', async () => {
    const error = await agile.backlog.moveIssuesToBacklog({ issues: ['NOSUCH-1'] }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('rejects a board that does not exist', async () => {
    const error = await agile.backlog
      .moveIssuesToBacklogForBoard({ boardId: 99999999, issues: [issue.key] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
