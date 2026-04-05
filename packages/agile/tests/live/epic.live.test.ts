import type { Client } from '@jira.js/base';
import { ApiError } from '@jira.js/base';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLiveAgileClient, type LiveAgileClient } from './helpers/createLiveAgileClient';
import { createIsolatedTestBoard, destroyIsolatedTestBoard, type IsolatedTestBoard } from './helpers/isolatedTestBoard';
import { createLiveBaseClient } from './helpers/liveBaseClient';
import {
  deleteOwnedLiveProject,
  resolveLiveTestProject,
  type ResolvedLiveProject,
} from './helpers/resolveLiveTestProject';
import { createTestIssue } from './helpers/fixtures/createTestIssue';
import { createTestEpic, findEpicIssueTypeId } from './helpers/fixtures/createTestEpic';
import { BOARD_SETUP_TIMEOUT } from './helpers/liveTestConstants';

async function getEpicKeys(live: LiveAgileClient, boardId: number): Promise<string[]> {
  const result = await live.client.board.getEpics({ boardId });

  return (result.values ?? []).map(e => e.key).filter((k): k is string => k != null);
}

describe('epic — live', () => {
  describe('getEpic', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let projectKey!: string;
    let epicIssue: { id: string; key: string; summary: string; name: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;

      try {
        isolated = await createIsolatedTestBoard(live.client, http, projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const epicTypeId = await findEpicIssueTypeId(http, projectKey);

      epicIssue = await createTestEpic(http, projectKey, epicTypeId);
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns epic by key', async () => {
      const result = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(result.key).toBe(epicIssue.key);
    });

    it('returns epic by id', async () => {
      const result = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.id });

      expect(result.key).toBe(epicIssue.key);
    });

    it('response has id, self, name, summary, key, done fields', async () => {
      const result = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(typeof result.id).toBe('number');
      expect(typeof result.self).toBe('string');
      expect(typeof result.name).toBe('string');
      expect(typeof result.summary).toBe('string');
      expect(typeof result.key).toBe('string');
      expect(typeof result.done).toBe('boolean');
    });

    it('summary matches the value set at creation', async () => {
      const result = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(result.summary).toBe(epicIssue.summary);
    });

    it('self URL points to the agile epic endpoint', async () => {
      const result = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(result.self).toContain('/rest/agile/1.0/epic/');
    });

    it('throws ApiError for a nonexistent epic key', async () => {
      await expect(live.client.epic.getEpic({ epicIdOrKey: 'INVALID-99999' })).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent epic id', async () => {
      await expect(live.client.epic.getEpic({ epicIdOrKey: '999999999' })).rejects.toThrow(ApiError);
    });
  });

  describe('partiallyUpdateEpic', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let projectKey!: string;
    let epicIssue: { id: string; key: string; summary: string; name: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;

      try {
        isolated = await createIsolatedTestBoard(live.client, http, projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const epicTypeId = await findEpicIssueTypeId(http, projectKey);

      epicIssue = await createTestEpic(http, projectKey, epicTypeId);
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns the updated epic object', async () => {
      const newSummary = `sdk-updated-${Date.now()}`;

      const result = await live.client.epic.partiallyUpdateEpic({
        epicIdOrKey: epicIssue.key,
        summary: newSummary,
      });

      expect(result.key).toBe(epicIssue.key);
      expect(result.summary).toBe(newSummary);

      epicIssue = { ...epicIssue, summary: newSummary };
    });

    it('updated summary is reflected in getEpic', async () => {
      const newSummary = `sdk-summary-${Date.now()}`;

      await live.client.epic.partiallyUpdateEpic({
        epicIdOrKey: epicIssue.key,
        summary: newSummary,
      });

      const fetched = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(fetched.summary).toBe(newSummary);

      epicIssue = { ...epicIssue, summary: newSummary };
    });

    it('updated name is reflected in getEpic', async () => {
      const newName = `sdk-name-${Date.now()}`;

      await live.client.epic.partiallyUpdateEpic({
        epicIdOrKey: epicIssue.key,
        name: newName,
      });

      const fetched = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(fetched.name).toBe(newName);

      epicIssue = { ...epicIssue, name: newName };
    });

    it('setting done to true is reflected in getEpic', async () => {
      await live.client.epic.partiallyUpdateEpic({
        epicIdOrKey: epicIssue.key,
        done: true,
      });

      const fetched = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(fetched.done).toBe(true);
    });

    it('setting done back to false is reflected in getEpic', async () => {
      await live.client.epic.partiallyUpdateEpic({
        epicIdOrKey: epicIssue.key,
        done: false,
      });

      const fetched = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(fetched.done).toBe(false);
    });

    it('updated color is reflected in getEpic', async () => {
      await live.client.epic.partiallyUpdateEpic({
        epicIdOrKey: epicIssue.key,
        color: { key: 'color_3' },
      });

      const fetched = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(fetched.color?.key).toBe('color_3');
    });

    it('partial update leaves unspecified fields unchanged', async () => {
      const summaryBefore = epicIssue.summary;
      const newName = `sdk-partial-${Date.now()}`;

      await live.client.epic.partiallyUpdateEpic({
        epicIdOrKey: epicIssue.key,
        name: newName,
      });

      const fetched = await live.client.epic.getEpic({ epicIdOrKey: epicIssue.key });

      expect(fetched.name).toBe(newName);
      expect(fetched.summary).toBe(summaryBefore);
    });

    it('throws ApiError for a nonexistent epic key', async () => {
      await expect(
        live.client.epic.partiallyUpdateEpic({
          epicIdOrKey: 'INVALID-99999',
          summary: 'should not matter',
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('rankEpics', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let projectKey!: string;
    let epicA: { id: string; key: string };
    let epicB: { id: string; key: string };
    let epicC: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;

      try {
        isolated = await createIsolatedTestBoard(live.client, http, projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const epicTypeId = await findEpicIssueTypeId(http, projectKey);

      // Create sequentially so they have a deterministic initial rank order: A, B, C
      epicA = await createTestEpic(http, projectKey, epicTypeId);
      epicB = await createTestEpic(http, projectKey, epicTypeId);
      epicC = await createTestEpic(http, projectKey, epicTypeId);
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when ranking an epic before another', async () => {
      const result = await live.client.epic.rankEpics({
        epicIdOrKey: epicC.key,
        rankBeforeEpic: epicA.key,
      });

      expect(result).toBeUndefined();
    });

    it('rankBeforeEpic — epic appears before the target in board.getEpics', async () => {
      await live.client.epic.rankEpics({
        epicIdOrKey: epicC.key,
        rankBeforeEpic: epicA.key,
      });

      const keys = await getEpicKeys(live, isolated!.boardId);
      const idxC = keys.indexOf(epicC.key);
      const idxA = keys.indexOf(epicA.key);

      expect(idxC).toBeGreaterThanOrEqual(0);
      expect(idxA).toBeGreaterThanOrEqual(0);
      expect(idxC).toBeLessThan(idxA);
    });

    it('rankAfterEpic — epic appears after the target in board.getEpics', async () => {
      await live.client.epic.rankEpics({
        epicIdOrKey: epicA.key,
        rankAfterEpic: epicC.key,
      });

      const keys = await getEpicKeys(live, isolated!.boardId);
      const idxC = keys.indexOf(epicC.key);
      const idxA = keys.indexOf(epicA.key);

      expect(idxC).toBeGreaterThanOrEqual(0);
      expect(idxA).toBeGreaterThanOrEqual(0);
      expect(idxA).toBeGreaterThan(idxC);
    });

    it('ranking is reversible — re-ranking restores a different order', async () => {
      await live.client.epic.rankEpics({
        epicIdOrKey: epicB.key,
        rankBeforeEpic: epicC.key,
      });

      const keysBefore = await getEpicKeys(live, isolated!.boardId);
      const idxBBefore = keysBefore.indexOf(epicB.key);
      const idxCBefore = keysBefore.indexOf(epicC.key);

      expect(idxBBefore).toBeLessThan(idxCBefore);

      await live.client.epic.rankEpics({
        epicIdOrKey: epicB.key,
        rankAfterEpic: epicC.key,
      });

      const keysAfter = await getEpicKeys(live, isolated!.boardId);
      const idxBAfter = keysAfter.indexOf(epicB.key);
      const idxCAfter = keysAfter.indexOf(epicC.key);

      expect(idxBAfter).toBeGreaterThan(idxCAfter);
    });

    it('throws ApiError for a nonexistent subject epic key', async () => {
      await expect(
        live.client.epic.rankEpics({
          epicIdOrKey: 'INVALID-99999',
          rankBeforeEpic: epicA.key,
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent rankBeforeEpic target', async () => {
      await expect(
        live.client.epic.rankEpics({
          epicIdOrKey: epicA.key,
          rankBeforeEpic: 'INVALID-99999',
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent rankAfterEpic target', async () => {
      await expect(
        live.client.epic.rankEpics({
          epicIdOrKey: epicA.key,
          rankAfterEpic: 'INVALID-99999',
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getIssuesForEpic', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let projectKey!: string;
    let epicIssue: { id: string; key: string };
    let emptyEpic: { id: string; key: string };
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;

      try {
        isolated = await createIsolatedTestBoard(live.client, http, projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const epicTypeId = await findEpicIssueTypeId(http, projectKey);

      [epicIssue, emptyEpic, issueA, issueB] = await Promise.all([
        createTestEpic(http, projectKey, epicTypeId),
        createTestEpic(http, projectKey, epicTypeId),
        createTestIssue(http, projectKey),
        createTestIssue(http, projectKey),
      ]);

      await live.client.epic.moveIssuesToEpic({
        epicIdOrKey: epicIssue.key,
        issues: [issueA.key, issueB.key],
      });
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('response has expected SearchResults shape (maxResults, startAt, total, issues)', async () => {
      const result = await live.client.epic.getIssuesForEpic({ epicIdOrKey: epicIssue.key });

      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.issues)).toBe(true);
    });

    it('issues assigned to the epic are included in the results', async () => {
      const result = await live.client.epic.getIssuesForEpic({ epicIdOrKey: epicIssue.key });

      const returnedKeys = result.issues.map(issue => issue.key);

      expect(returnedKeys).toContain(issueA.key);
      expect(returnedKeys).toContain(issueB.key);
    });

    it('each returned issue has id, key, and self fields', async () => {
      const result = await live.client.epic.getIssuesForEpic({ epicIdOrKey: epicIssue.key });

      expect(result.issues.length).toBeGreaterThan(0);

      for (const issue of result.issues) {
        expect(issue.id).toBeDefined();
        expect(typeof issue.id).toBe('string');
        expect(issue.key).toBeDefined();
        expect(typeof issue.key).toBe('string');
        expect(issue.self).toBeDefined();
      }
    });

    it('returns empty issues array for an epic with no assigned issues', async () => {
      const result = await live.client.epic.getIssuesForEpic({ epicIdOrKey: emptyEpic.key });

      expect(Array.isArray(result.issues)).toBe(true);
      expect(result.issues).toHaveLength(0);
      expect(result.total).toBe(0);
    });

    it('respects maxResults parameter', async () => {
      const result = await live.client.epic.getIssuesForEpic({
        epicIdOrKey: epicIssue.key,
        maxResults: 1,
      });

      expect(result.issues).toHaveLength(1);
      expect(result.maxResults).toBe(1);
      expect(result.total).toBeGreaterThanOrEqual(2);
    });

    it('respects startAt parameter for pagination', async () => {
      const firstPage = await live.client.epic.getIssuesForEpic({
        epicIdOrKey: epicIssue.key,
        maxResults: 1,
        startAt: 0,
      });

      const secondPage = await live.client.epic.getIssuesForEpic({
        epicIdOrKey: epicIssue.key,
        maxResults: 1,
        startAt: 1,
      });

      expect(firstPage.issues).toHaveLength(1);
      expect(secondPage.issues).toHaveLength(1);
      expect(firstPage.issues[0]!.key).not.toBe(secondPage.issues[0]!.key);
    });

    it('throws ApiError for a nonexistent epic key', async () => {
      await expect(live.client.epic.getIssuesForEpic({ epicIdOrKey: 'INVALID-99999' })).rejects.toThrow(ApiError);
    });
  });

  describe('getIssuesWithoutEpic', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let projectKey!: string;
    let issueKeys: string[] = [];

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;

      try {
        isolated = await createIsolatedTestBoard(live.client, http, projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const [issue1, issue2] = await Promise.all([
        createTestIssue(http, projectKey),
        createTestIssue(http, projectKey),
      ]);

      issueKeys = [issue1.key, issue2.key];
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('response has expected SearchResults shape (maxResults, startAt, total, issues)', async () => {
      const result = await live.client.epic.getIssuesWithoutEpic({
        jql: `project = ${projectKey}`,
      });

      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.issues)).toBe(true);
    });

    it('issues created without an epic are included in the results', async () => {
      const result = await live.client.epic.getIssuesWithoutEpic({
        jql: `project = ${projectKey}`,
      });

      const returnedKeys = result.issues.map(issue => issue.key);

      for (const key of issueKeys) {
        expect(returnedKeys).toContain(key);
      }
    });

    it('each returned issue has id, key, and self fields', async () => {
      const result = await live.client.epic.getIssuesWithoutEpic({
        jql: `project = ${projectKey}`,
      });

      expect(result.issues.length).toBeGreaterThan(0);

      for (const issue of result.issues) {
        expect(issue.id).toBeDefined();
        expect(typeof issue.id).toBe('string');
        expect(issue.key).toBeDefined();
        expect(typeof issue.key).toBe('string');
        expect(issue.self).toBeDefined();
      }
    });

    it('respects maxResults parameter', async () => {
      const result = await live.client.epic.getIssuesWithoutEpic({
        jql: `project = ${projectKey}`,
        maxResults: 1,
      });

      expect(result.issues).toHaveLength(1);
      expect(result.maxResults).toBe(1);
      expect(result.total).toBeGreaterThanOrEqual(2);
    });

    it('respects startAt parameter for pagination', async () => {
      const firstPage = await live.client.epic.getIssuesWithoutEpic({
        jql: `project = ${projectKey}`,
        maxResults: 1,
        startAt: 0,
      });

      const secondPage = await live.client.epic.getIssuesWithoutEpic({
        jql: `project = ${projectKey}`,
        maxResults: 1,
        startAt: 1,
      });

      expect(firstPage.issues).toHaveLength(1);
      expect(secondPage.issues).toHaveLength(1);
      expect(firstPage.issues[0]!.key).not.toBe(secondPage.issues[0]!.key);
    });

    it('jql parameter scopes results to the specified project', async () => {
      const result = await live.client.epic.getIssuesWithoutEpic({
        jql: `project = ${projectKey}`,
      });

      for (const issue of result.issues) {
        expect(issue.key).toMatch(new RegExp(`^${projectKey}-`));
      }
    });
  });

  describe('moveIssuesToEpic', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let projectKey!: string;
    let epicA: { id: string; key: string };
    let epicB: { id: string; key: string };
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };
    let issueC: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;

      try {
        isolated = await createIsolatedTestBoard(live.client, http, projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const epicTypeId = await findEpicIssueTypeId(http, projectKey);

      [epicA, epicB, issueA, issueB, issueC] = await Promise.all([
        createTestEpic(http, projectKey, epicTypeId),
        createTestEpic(http, projectKey, epicTypeId),
        createTestIssue(http, projectKey),
        createTestIssue(http, projectKey),
        createTestIssue(http, projectKey),
      ]);
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when moving issues to an epic', async () => {
      const result = await live.client.epic.moveIssuesToEpic({
        epicIdOrKey: epicA.key,
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('moved issue appears in getIssuesForEpic', async () => {
      await live.client.epic.moveIssuesToEpic({
        epicIdOrKey: epicA.key,
        issues: [issueB.key],
      });

      const page = await live.client.epic.getIssuesForEpic({ epicIdOrKey: epicA.key });
      const keys = page.issues.map(issue => issue.key);

      expect(keys).toContain(issueB.key);
    });

    it('moving multiple issues at once assigns all of them to the epic', async () => {
      await live.client.epic.moveIssuesToEpic({
        epicIdOrKey: epicB.key,
        issues: [issueA.key, issueC.key],
      });

      const page = await live.client.epic.getIssuesForEpic({ epicIdOrKey: epicB.key });
      const keys = page.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).toContain(issueC.key);
    });

    it('issue is removed from the previous epic when moved to a new one', async () => {
      const pageA = await live.client.epic.getIssuesForEpic({ epicIdOrKey: epicA.key });
      const keysA = pageA.issues.map(issue => issue.key);

      expect(keysA).not.toContain(issueA.key);
    });

    it('is idempotent — moving an already-assigned issue to the same epic returns void', async () => {
      const result = await live.client.epic.moveIssuesToEpic({
        epicIdOrKey: epicB.key,
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('throws ApiError for a nonexistent epic key', async () => {
      await expect(
        live.client.epic.moveIssuesToEpic({
          epicIdOrKey: 'INVALID-99999',
          issues: [issueC.key],
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.epic.moveIssuesToEpic({
          epicIdOrKey: epicA.key,
          issues: ['INVALID-99999'],
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('removeIssuesFromEpic', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let projectKey!: string;
    let epicIssue: { id: string; key: string };
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;

      try {
        isolated = await createIsolatedTestBoard(live.client, http, projectKey);
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      const epicTypeId = await findEpicIssueTypeId(http, projectKey);

      [epicIssue, issueA, issueB] = await Promise.all([
        createTestEpic(http, projectKey, epicTypeId),
        createTestIssue(http, projectKey),
        createTestIssue(http, projectKey),
      ]);

      await live.client.epic.moveIssuesToEpic({
        epicIdOrKey: epicIssue.key,
        issues: [issueA.key, issueB.key],
      });
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when removing issues from an epic', async () => {
      const result = await live.client.epic.removeIssuesFromEpic({
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('removed issue no longer appears in getIssuesForEpic', async () => {
      const page = await live.client.epic.getIssuesForEpic({ epicIdOrKey: epicIssue.key });

      const keys = page.issues.map(issue => issue.key);

      expect(keys).not.toContain(issueA.key);
      expect(keys).toContain(issueB.key);
    });

    it('removed issue appears in getIssuesWithoutEpic for the project', async () => {
      const result = await live.client.epic.getIssuesWithoutEpic({
        jql: `project = ${projectKey} AND issuekey = ${issueA.key}`,
      });

      const keys = result.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
    });

    it('is idempotent — removing an already-detached issue returns void', async () => {
      const result = await live.client.epic.removeIssuesFromEpic({
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('throws ApiError for a nonexistent issue key', async () => {
      await expect(live.client.epic.removeIssuesFromEpic({ issues: ['INVALID-99999'] })).rejects.toThrow(ApiError);
    });
  });
});
