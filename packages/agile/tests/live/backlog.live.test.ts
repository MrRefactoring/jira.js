import type { Client } from '@jira.js/base';
import { ApiError } from '@jira.js/base';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Issue } from '../../src/models/issue';
import { createLiveAgileClient, type LiveAgileClient } from './helpers/createLiveAgileClient';
import { createIsolatedTestBoard, destroyIsolatedTestBoard, type IsolatedTestBoard } from './helpers/isolatedTestBoard';
import { createLiveBaseClient } from './helpers/liveBaseClient';
import {
  deleteOwnedLiveProject,
  type ResolvedLiveProject,
  resolveLiveTestProject,
} from './helpers/resolveLiveTestProject';
import { createTestIssue } from './helpers/fixtures/createTestIssue';
import { BOARD_SETUP_TIMEOUT } from './helpers/liveTestConstants';

describe('backlog — live', () => {
  describe('moveIssuesToBacklog', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let sprintId!: number;
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };
    let issueC: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);

      try {
        isolated = await createIsolatedTestBoard(live.client, http, resolvedProject.projectKey);
        boardId = isolated.boardId;
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const sprint = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintId = sprint.id!;

      [issueA, issueB, issueC] = await Promise.all([
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
      ]);

      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: [issueA.key, issueB.key, issueC.key],
      });
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      await live.client.sprint.deleteSprint({ sprintId }).catch(() => {});

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when moving issues to the backlog', async () => {
      const result = await live.client.backlog.moveIssuesToBacklog({
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('moved issue no longer appears in getIssuesForSprint', async () => {
      await live.client.backlog.moveIssuesToBacklog({
        issues: [issueB.key],
      });

      const page = await live.client.sprint.getIssuesForSprint({ sprintId });
      const keys = page.issues.map((issue: Issue) => issue.key);

      expect(keys).not.toContain(issueB.key);
    });

    it('moved issue appears in getIssuesForBacklog', async () => {
      const page = await live.client.board.getIssuesForBacklog({
        boardId,
        jql: `issuekey = ${issueB.key}`,
      });

      const keys = page.issues.map(issue => issue.key);

      expect(keys).toContain(issueB.key);
    });

    it('moving multiple issues at once removes all of them from the sprint', async () => {
      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: [issueB.key, issueC.key],
      });

      await live.client.backlog.moveIssuesToBacklog({
        issues: [issueB.key, issueC.key],
      });

      const page = await live.client.sprint.getIssuesForSprint({ sprintId });
      const keys = page.issues.map((issue: Issue) => issue.key);

      expect(keys).not.toContain(issueB.key);
      expect(keys).not.toContain(issueC.key);
    });

    it('is idempotent — moving an already-backlogged issue returns void', async () => {
      const result = await live.client.backlog.moveIssuesToBacklog({
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.backlog.moveIssuesToBacklog({
          issues: ['INVALID-99999'],
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('moveIssuesToBacklogForBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let sprintId!: number;
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };
    let issueC: { id: string; key: string };
    let issueD: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);

      try {
        isolated = await createIsolatedTestBoard(live.client, http, resolvedProject.projectKey);
        boardId = isolated.boardId;
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const sprint = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintId = sprint.id!;

      [issueA, issueB, issueC, issueD] = await Promise.all([
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
      ]);

      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: [issueA.key, issueB.key, issueC.key, issueD.key],
      });
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      await live.client.sprint.deleteSprint({ sprintId }).catch(() => {});

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when moving an issue to the board backlog', async () => {
      const result = await live.client.backlog.moveIssuesToBacklogForBoard({
        boardId,
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('moved issue no longer appears in getIssuesForSprint', async () => {
      await live.client.backlog.moveIssuesToBacklogForBoard({
        boardId,
        issues: [issueB.key],
      });

      const page = await live.client.sprint.getIssuesForSprint({ sprintId });
      const keys = page.issues.map((issue: Issue) => issue.key);

      expect(keys).not.toContain(issueB.key);
    });

    it('moved issue appears in getIssuesForBacklog', async () => {
      const page = await live.client.board.getIssuesForBacklog({
        boardId,
        jql: `issuekey = ${issueB.key}`,
      });

      const keys = page.issues.map(issue => issue.key);

      expect(keys).toContain(issueB.key);
    });

    it('moving multiple issues at once removes all of them from the sprint', async () => {
      await live.client.backlog.moveIssuesToBacklogForBoard({
        boardId,
        issues: [issueC.key, issueD.key],
      });

      const page = await live.client.sprint.getIssuesForSprint({ sprintId });
      const keys = page.issues.map((issue: Issue) => issue.key);

      expect(keys).not.toContain(issueC.key);
      expect(keys).not.toContain(issueD.key);
    });

    it('rankBeforeIssue — moved issue appears before the reference issue in the backlog', async () => {
      await live.client.backlog.moveIssuesToBacklogForBoard({
        boardId,
        issues: [issueD.key],
        rankBeforeIssue: issueC.key,
      });

      const page = await live.client.board.getIssuesForBacklog({ boardId });
      const keys = page.issues.map(issue => issue.key);

      const idxD = keys.indexOf(issueD.key);
      const idxC = keys.indexOf(issueC.key);

      expect(idxD).toBeGreaterThanOrEqual(0);
      expect(idxC).toBeGreaterThanOrEqual(0);
      expect(idxD).toBeLessThan(idxC);
    });

    it('rankAfterIssue — moved issue appears after the reference issue in the backlog', async () => {
      await live.client.backlog.moveIssuesToBacklogForBoard({
        boardId,
        issues: [issueD.key],
        rankAfterIssue: issueC.key,
      });

      const page = await live.client.board.getIssuesForBacklog({ boardId });
      const keys = page.issues.map(issue => issue.key);

      const idxD = keys.indexOf(issueD.key);
      const idxC = keys.indexOf(issueC.key);

      expect(idxD).toBeGreaterThanOrEqual(0);
      expect(idxC).toBeGreaterThanOrEqual(0);
      expect(idxD).toBeGreaterThan(idxC);
    });

    it('is idempotent — moving an already-backlogged issue returns void', async () => {
      const result = await live.client.backlog.moveIssuesToBacklogForBoard({
        boardId,
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(
        live.client.backlog.moveIssuesToBacklogForBoard({
          boardId: 999_999_999,
          issues: [issueA.key],
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.backlog.moveIssuesToBacklogForBoard({
          boardId,
          issues: ['INVALID-99999'],
        }),
      ).rejects.toThrow(ApiError);
    });
  });
});
