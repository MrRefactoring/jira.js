import type { Client } from '@jira.js/base';
import { ApiError } from '@jira.js/base';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Issue } from '../../src/models/issue';
import { createLiveAgileClient, type LiveAgileClient } from './helpers/createLiveAgileClient';
import { createIsolatedTestBoard, destroyIsolatedTestBoard, type IsolatedTestBoard } from './helpers/isolatedTestBoard';
import { createLiveBaseClient } from './helpers/liveBaseClient';
import {
  deleteOwnedLiveProject,
  resolveLiveTestProject,
  type ResolvedLiveProject,
} from './helpers/resolveLiveTestProject';
import { createTestIssue } from './helpers/fixtures/createTestIssue';
import { BOARD_SETUP_TIMEOUT } from './helpers/liveTestConstants';

describe('issue — live', () => {
  describe('getIssue', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let testIssue: { id: string; key: string } | undefined;

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      testIssue = await createTestIssue(http, resolvedProject.projectKey);
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (resolvedProject?.ownsProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      } else if (resolvedProject && testIssue?.key) {
        await http
          .sendRequest({
            url: `/rest/api/3/issue/${testIssue.key}`,
            method: 'DELETE',
          })
          .catch(() => {});
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns the issue when requested by key', async () => {
      const result = await live.client.issue.getIssue({ issueIdOrKey: testIssue!.key });

      expect(result.key).toBe(testIssue!.key);
      expect(result.id).toBe(testIssue!.id);
    });

    it('returns the same issue when requested by id', async () => {
      const result = await live.client.issue.getIssue({ issueIdOrKey: testIssue!.id });

      expect(result.key).toBe(testIssue!.key);
      expect(result.id).toBe(testIssue!.id);
    });

    it('response has id, key, and self fields', async () => {
      const result = await live.client.issue.getIssue({ issueIdOrKey: testIssue!.key });

      expect(typeof result.id).toBe('string');
      expect(typeof result.key).toBe('string');
      expect(typeof result.self).toBe('string');
    });

    it('self URL points to the agile issue endpoint', async () => {
      const result = await live.client.issue.getIssue({ issueIdOrKey: testIssue!.key });

      expect(result.self).toContain('/rest/agile/1.0/issue/');
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(live.client.issue.getIssue({ issueIdOrKey: 'INVALID-99999' })).rejects.toThrow(ApiError);
    });
  });

  describe('estimateIssueForBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let issue: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);

      try {
        isolated = await createIsolatedTestBoard(live.client, http, resolvedProject.projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      issue = await createTestIssue(http, resolvedProject.projectKey, 'Story');
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('sets an estimation value and returns it in the response', async () => {
      const result = await live.client.issue.estimateIssueForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
        value: '5',
      });

      expect(result.value).toBe(5);
      expect(typeof result.fieldId).toBe('string');
    });

    it('updated value is reflected by getIssueEstimationForBoard', async () => {
      await live.client.issue.estimateIssueForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
        value: '8',
      });

      const estimation = await live.client.issue.getIssueEstimationForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
      });

      expect(Number(estimation.value)).toBe(8);
    });

    it('overwrites a previously set estimation', async () => {
      await live.client.issue.estimateIssueForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
        value: '3',
      });

      const result = await live.client.issue.estimateIssueForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
        value: '13',
      });

      expect(Number(result.value)).toBe(13);
    });

    it('clears an estimation when value is omitted', async () => {
      await live.client.issue.estimateIssueForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
        value: '5',
      });

      const result = await live.client.issue.estimateIssueForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
      });

      expect(result.value == null).toBe(true);
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.issue.estimateIssueForBoard({
          issueIdOrKey: 'INVALID-99999',
          boardId: isolated!.boardId,
          value: '5',
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent boardId', async () => {
      await expect(
        live.client.issue.estimateIssueForBoard({
          issueIdOrKey: issue.key,
          boardId: 999999999,
          value: '5',
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getIssueEstimationForBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let issue: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);

      try {
        isolated = await createIsolatedTestBoard(live.client, http, resolvedProject.projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      issue = await createTestIssue(http, resolvedProject.projectKey);
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns fieldId for a valid issue and board', async () => {
      const result = await live.client.issue.getIssueEstimationForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
      });

      expect(typeof result.fieldId).toBe('string');
      expect(result.fieldId!.length).toBeGreaterThan(0);
    });

    it('value is undefined or string for an issue with no estimate set', async () => {
      const result = await live.client.issue.getIssueEstimationForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
      });

      expect(result.value === undefined || typeof result.value === 'string').toBe(true);
    });

    it('returns the same fieldId when queried by issue id instead of key', async () => {
      const byKey = await live.client.issue.getIssueEstimationForBoard({
        issueIdOrKey: issue.key,
        boardId: isolated!.boardId,
      });

      const byId = await live.client.issue.getIssueEstimationForBoard({
        issueIdOrKey: issue.id,
        boardId: isolated!.boardId,
      });

      expect(byId.fieldId).toBe(byKey.fieldId);
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.issue.getIssueEstimationForBoard({
          issueIdOrKey: 'INVALID-99999',
          boardId: isolated!.boardId,
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent boardId', async () => {
      await expect(
        live.client.issue.getIssueEstimationForBoard({
          issueIdOrKey: issue.key,
          boardId: 999999999,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('rankIssues', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
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
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const sprint = await live.client.sprint.createSprint({
        name: `sdk-live-${Date.now()}`,
        originBoardId: isolated.boardId,
      });
      sprintId = sprint.id!;

      [issueA, issueB, issueC] = await Promise.all([
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
      ]);

      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: [issueA.key, issueB.key],
      });

      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: [issueC.key],
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

    it('returns void when ranking issues', async () => {
      const result = await live.client.issue.rankIssues({
        issues: [issueC.key],
        rankBeforeIssue: issueA.key,
      });

      expect(result).toBeUndefined();
    });

    it('supports rankBeforeIssue — ranked issue appears before the reference issue', async () => {
      await live.client.issue.rankIssues({
        issues: [issueC.key],
        rankBeforeIssue: issueA.key,
      });

      const page = await live.client.sprint.getIssuesForSprint({ sprintId });
      const keys = page.issues.map((issue: Issue) => issue.key);

      const indexC = keys.indexOf(issueC.key);
      const indexA = keys.indexOf(issueA.key);

      expect(indexC).toBeGreaterThanOrEqual(0);
      expect(indexA).toBeGreaterThanOrEqual(0);
      expect(indexC).toBeLessThan(indexA);
    });

    it('supports rankAfterIssue — ranked issue appears after the reference issue', async () => {
      await live.client.issue.rankIssues({
        issues: [issueC.key],
        rankAfterIssue: issueB.key,
      });

      const page = await live.client.sprint.getIssuesForSprint({ sprintId });
      const keys = page.issues.map((issue: Issue) => issue.key);

      const indexC = keys.indexOf(issueC.key);
      const indexB = keys.indexOf(issueB.key);

      expect(indexC).toBeGreaterThanOrEqual(0);
      expect(indexB).toBeGreaterThanOrEqual(0);
      expect(indexC).toBeGreaterThan(indexB);
    });

    it('throws an ApiError for a nonexistent issue key in issues list', async () => {
      await expect(
        live.client.issue.rankIssues({
          issues: ['INVALID-99999'],
          rankBeforeIssue: issueA.key,
        }),
      ).rejects.toThrow(ApiError);
    });
  });
});
