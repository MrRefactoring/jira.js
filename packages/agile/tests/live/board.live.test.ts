import type { Client } from '@jira.js/base';
import { ApiError } from '@jira.js/base';
import type { Version } from '#/models/version';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import type { TestContext } from 'vitest';
import { z } from 'zod';
import { createCloudClient, type CloudClient } from '@jira.js/cloud';
import { createLiveAgileClient, type LiveAgileClient } from './helpers/createLiveAgileClient';
import { createIsolatedTestBoard, destroyIsolatedTestBoard, type IsolatedTestBoard } from './helpers/isolatedTestBoard';
import {
  createTeamManagedTestBoard,
  destroyTeamManagedTestBoard,
  type TeamManagedTestBoard,
} from './helpers/teamManagedTestBoard';
import { createLiveBaseClient } from './helpers/liveBaseClient';
import { getInjectedLiveProject } from './helpers/liveTestState';
import {
  deleteOwnedLiveProject,
  resolveLiveTestProject,
  type ResolvedLiveProject,
} from './helpers/resolveLiveTestProject';
import {
  getToggleCandidates,
  isNoReversibleTogglePreparationFailure,
  NO_REVERSIBLE_TOGGLE_FEATURE_MESSAGE,
} from './helpers/boardFeaturesPreparation';
import { withBoardPreparationRetries } from './helpers/boardPreparationRetry';
import { createTestIssue } from './helpers/fixtures/createTestIssue';
import { createTestEpic, findEpicIssueTypeId } from './helpers/fixtures/createTestEpic';
import { BOARD_SETUP_TIMEOUT, KANBAN_BACKLOG_FEATURE } from './helpers/liveTestConstants';

const FilterCreatedSchema = z.object({
  id: z.coerce.number(),
});

const VersionCreatedSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(v => (typeof v === 'string' ? Number(v) : v)),
  name: z.string(),
});

async function createFilter(http: Client, projectKey: string): Promise<number> {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const filter = await http.sendRequest({
    url: '/rest/api/3/filter',
    method: 'POST',
    body: {
      name: `sdk-live-filter-${suffix}`,
      jql: `project = ${projectKey} ORDER BY Rank ASC`,
    },
    schema: FilterCreatedSchema,
  });

  return filter.id;
}

async function deleteFilter(http: Client, filterId: number): Promise<void> {
  await http.sendRequest({ url: `/rest/api/3/filter/${filterId}`, method: 'DELETE' }).catch(() => {});
}

async function createBoardWithTogglePreparation(
  live: LiveAgileClient,
): Promise<{ board: TeamManagedTestBoard; feature: string; state: 'ENABLED' | 'DISABLED' }> {
  const cloud = createCloudClient({
    host: live.env.baseUrl,
    auth: { type: 'basic', email: live.env.email, apiToken: live.env.apiToken },
  });
  const { accountId } = getInjectedLiveProject();

  return withBoardPreparationRetries({
    operation: 'toggleFeatures',
    attempts: 5,
    createBoard: async () => createTeamManagedTestBoard(live.client, cloud, accountId, 'scrum'),
    destroyBoard: async board => destroyTeamManagedTestBoard(cloud, board),
    probe: async board => {
      const features = await live.client.board.getFeaturesForBoard({ boardId: board.boardId });
      const candidates = getToggleCandidates(features.features);

      for (const candidate of candidates) {
        const targetState = candidate.state === 'DISABLED';

        await live.client.board.toggleFeatures({
          boardId: board.boardId,
          body: {
            boardId: board.boardId,
            feature: candidate.feature,
            enabling: targetState,
          },
        });

        await live.client.board.toggleFeatures({
          boardId: board.boardId,
          body: {
            boardId: board.boardId,
            feature: candidate.feature,
            enabling: candidate.state === 'ENABLED',
          },
        });

        return { board, feature: candidate.feature, state: candidate.state };
      }

      throw new Error(NO_REVERSIBLE_TOGGLE_FEATURE_MESSAGE);
    },
  });
}

async function createCapabilityReadyBoard(live: LiveAgileClient, http: Client): Promise<TeamManagedTestBoard> {
  const cloud = createCloudClient({
    host: live.env.baseUrl,
    auth: { type: 'basic', email: live.env.email, apiToken: live.env.apiToken },
  });
  const { accountId } = getInjectedLiveProject();

  return withBoardPreparationRetries({
    operation: 'moveIssuesToBoard',
    attempts: 5,
    createBoard: async () => createTeamManagedTestBoard(live.client, cloud, accountId, 'kanban'),
    destroyBoard: async board => destroyTeamManagedTestBoard(cloud, board),
    probe: async board => {
      await live.client.board.toggleFeatures({
        boardId: board.boardId,
        body: {
          boardId: board.boardId,
          feature: KANBAN_BACKLOG_FEATURE,
          enabling: true,
        },
      });

      const probeIssue = await createTestIssue(http, board.projectKey);

      await live.client.board.moveIssuesToBoard({
        boardId: board.boardId,
        issues: [probeIssue.key],
      });

      return board;
    },
  });
}

describe('board — live', () => {
  describe('getAllBoards', () => {
    let live: LiveAgileClient;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

    beforeAll(async () => {
      live = createLiveAgileClient();
      const http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);

      try {
        isolated = await createIsolatedTestBoard(live.client, http, resolvedProject.projectKey);
        boardId = isolated.boardId;
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      const http = createLiveBaseClient(live.env);

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a GetAllBoards-shaped response', async () => {
      const result = await live.client.board.getAllBoards();

      expect(result).toBeDefined();
      expect(Array.isArray(result.values)).toBe(true);
    });

    it('response includes the isolated test board', async () => {
      const result = await live.client.board.getAllBoards();
      const ids = (result.values ?? []).map(b => b.id);

      expect(ids).toContain(boardId);
    });

    it('each board entry has id, name, type, and self fields', async () => {
      const result = await live.client.board.getAllBoards();
      const board = (result.values ?? []).find(b => b.id === boardId);

      expect(board).toBeDefined();
      expect(typeof board!.id).toBe('number');
      expect(typeof board!.name).toBe('string');
      expect(typeof board!.type).toBe('string');
      expect(typeof board!.self).toBe('string');
    });

    it('name filter — returns only boards matching the name substring', async () => {
      const all = await live.client.board.getAllBoards();
      const target = (all.values ?? []).find(b => b.id === boardId)!.name!;

      const filtered = await live.client.board.getAllBoards({ name: target });
      const ids = (filtered.values ?? []).map(b => b.id);

      expect(ids).toContain(boardId);
    });

    it('projectKeyOrId filter — returns only boards scoped to the test project', async () => {
      const result = await live.client.board.getAllBoards({
        projectKeyOrId: resolvedProject!.projectKey,
      });

      const ids = (result.values ?? []).map(b => b.id);

      expect(ids).toContain(boardId);
    });

    it('type filter "scrum" — isolated board is included and all returned boards are scrum', async () => {
      const result = await live.client.board.getAllBoards({ type: 'scrum' });
      const boards = result.values ?? [];
      const ids = boards.map(b => b.id);

      expect(ids).toContain(boardId);
      boards.forEach(b => expect(b.type).toBe('scrum'));
    });

    it('maxResults — respects the page size limit', async () => {
      const result = await live.client.board.getAllBoards({ maxResults: 1 });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
      expect(result.maxResults).toBe(1);
    });

    it('startAt pagination — page 2 differs from page 1 when there are multiple boards', async () => {
      const page1 = await live.client.board.getAllBoards({ maxResults: 1, startAt: 0 });
      const page2 = await live.client.board.getAllBoards({ maxResults: 1, startAt: 1 });

      const ids1 = (page1.values ?? []).map(b => b.id);
      const ids2 = (page2.values ?? []).map(b => b.id);

      // Pages may overlap only if the tenant has exactly 1 board total — otherwise they must differ
      if (ids1.length > 0 && ids2.length > 0) {
        expect(ids1[0]).not.toBe(ids2[0]);
      }
    });
  });

  describe('createBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let projectKey!: string;
    let sharedFilterId!: number;

    const createdBoardIds: number[] = [];
    const createdFilterIds: number[] = [];

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;
      sharedFilterId = await createFilter(http, projectKey);
    }, BOARD_SETUP_TIMEOUT);

    afterEach(async () => {
      for (const boardId of createdBoardIds.splice(0)) {
        await live.client.board.deleteBoard({ boardId }).catch(() => {});
      }
      for (const filterId of createdFilterIds.splice(0)) {
        await deleteFilter(http, filterId);
      }
    });

    afterAll(async () => {
      await deleteFilter(http, sharedFilterId);

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a CreateBoard-shaped response with id, name, type, and self', async () => {
      const boardName = `sdk-live-board-${Date.now()}`;

      const result = await live.client.board.createBoard({
        name: boardName,
        type: 'scrum',
        filterId: sharedFilterId,
      });

      expect(typeof result.id).toBe('number');
      expect(result.name).toBe(boardName);
      expect(result.type).toBe('scrum');
      expect(typeof result.self).toBe('string');

      createdBoardIds.push(result.id!);
    });

    it('created board appears in getAllBoards', async () => {
      const boardName = `sdk-live-board-${Date.now()}`;

      const created = await live.client.board.createBoard({
        name: boardName,
        type: 'scrum',
        filterId: sharedFilterId,
      });

      createdBoardIds.push(created.id!);

      const all = await live.client.board.getAllBoards();
      const ids = (all.values ?? []).map(b => b.id);

      expect(ids).toContain(created.id);
    });

    it('type "scrum" — created board has type scrum', async () => {
      const created = await live.client.board.createBoard({
        name: `sdk-live-board-${Date.now()}`,
        type: 'scrum',
        filterId: sharedFilterId,
      });

      createdBoardIds.push(created.id!);

      expect(created.type).toBe('scrum');
    });

    it('type "kanban" — created board has type kanban', async () => {
      const filterId = await createFilter(http, projectKey);
      createdFilterIds.push(filterId);

      const created = await live.client.board.createBoard({
        name: `sdk-live-board-${Date.now()}`,
        type: 'kanban',
        filterId,
      });

      createdBoardIds.push(created.id!);

      expect(created.type).toBe('kanban');
    });

    it('location — board is scoped to the correct project', async () => {
      const created = await live.client.board.createBoard({
        name: `sdk-live-board-${Date.now()}`,
        type: 'scrum',
        filterId: sharedFilterId,
        location: {
          type: 'project',
          projectKeyOrId: projectKey,
        },
      });

      createdBoardIds.push(created.id!);

      // createBoard response does not reliably include location.projectKey — verify via getBoard
      const fetched = await live.client.board.getBoard({ boardId: created.id! });

      expect(fetched.location?.projectKey).toBe(projectKey);
    });

    it('created board is retrievable via getBoard', async () => {
      const boardName = `sdk-live-board-${Date.now()}`;

      const created = await live.client.board.createBoard({
        name: boardName,
        type: 'scrum',
        filterId: sharedFilterId,
      });

      createdBoardIds.push(created.id!);

      const fetched = await live.client.board.getBoard({ boardId: created.id! });

      expect(fetched.id).toBe(created.id);
      expect(fetched.name).toBe(boardName);
    });

    it('throws ApiError for a nonexistent filter ID', async () => {
      await expect(
        live.client.board.createBoard({
          name: `sdk-live-board-${Date.now()}`,
          type: 'scrum',
          filterId: 999_999_999,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a GetBoard-shaped response with id, name, type, and self', async () => {
      const result = await live.client.board.getBoard({ boardId });

      expect(typeof result.id).toBe('number');
      expect(typeof result.name).toBe('string');
      expect(typeof result.type).toBe('string');
      expect(typeof result.self).toBe('string');
    });

    it('returned board id matches the requested boardId', async () => {
      const result = await live.client.board.getBoard({ boardId });

      expect(result.id).toBe(boardId);
    });

    it('returned board type is scrum', async () => {
      const result = await live.client.board.getBoard({ boardId });

      expect(result.type).toBe('scrum');
    });

    it('returned board location contains the test project key', async () => {
      const result = await live.client.board.getBoard({ boardId });

      expect(result.location?.projectKey).toBe(resolvedProject!.projectKey);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getBoard({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('deleteBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let projectKey!: string;
    let sharedFilterId!: number;

    const survivingBoardIds: number[] = [];

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;
      sharedFilterId = await createFilter(http, projectKey);
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      for (const boardId of survivingBoardIds) {
        await live.client.board.deleteBoard({ boardId }).catch(() => {});
      }

      await deleteFilter(http, sharedFilterId);

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when deleting a board', async () => {
      const created = await live.client.board.createBoard({
        name: `sdk-live-board-${Date.now()}`,
        type: 'scrum',
        filterId: sharedFilterId,
      });

      survivingBoardIds.push(created.id!);

      const result = await live.client.board.deleteBoard({ boardId: created.id! });

      survivingBoardIds.splice(survivingBoardIds.indexOf(created.id!), 1);

      expect(result).toBeUndefined();
    });

    it('deleted board no longer appears in getAllBoards', async () => {
      const created = await live.client.board.createBoard({
        name: `sdk-live-board-${Date.now()}`,
        type: 'scrum',
        filterId: sharedFilterId,
      });

      survivingBoardIds.push(created.id!);

      await live.client.board.deleteBoard({ boardId: created.id! });

      survivingBoardIds.splice(survivingBoardIds.indexOf(created.id!), 1);

      const all = await live.client.board.getAllBoards();
      const ids = (all.values ?? []).map(b => b.id);

      expect(ids).not.toContain(created.id);
    });

    it('getBoard throws ApiError after deletion', async () => {
      const created = await live.client.board.createBoard({
        name: `sdk-live-board-${Date.now()}`,
        type: 'scrum',
        filterId: sharedFilterId,
      });

      survivingBoardIds.push(created.id!);

      await live.client.board.deleteBoard({ boardId: created.id! });

      survivingBoardIds.splice(survivingBoardIds.indexOf(created.id!), 1);

      await expect(live.client.board.getBoard({ boardId: created.id! })).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.deleteBoard({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getBoardByFilterId', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let filterId!: number;

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);

      try {
        isolated = await createIsolatedTestBoard(live.client, http, resolvedProject.projectKey);
        boardId = isolated.boardId;
        filterId = isolated.filterId;
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a paginated response with values, maxResults, startAt', async () => {
      const result = await live.client.board.getBoardByFilterId({ filterId });

      expect(Array.isArray(result.values)).toBe(true);
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
    });

    it('response includes the board that uses the filter', async () => {
      const result = await live.client.board.getBoardByFilterId({ filterId });
      const ids = (result.values ?? []).map(b => b.id);

      expect(ids).toContain(boardId);
    });

    it('each board entry has id, name, and self fields', async () => {
      const result = await live.client.board.getBoardByFilterId({ filterId });
      const board = (result.values ?? []).find(b => b.id === boardId);

      expect(board).toBeDefined();
      expect(typeof board!.id).toBe('number');
      expect(typeof board!.name).toBe('string');
      expect(typeof board!.self).toBe('string');
    });

    it('maxResults — respects the page size limit', async () => {
      const result = await live.client.board.getBoardByFilterId({ filterId, maxResults: 1 });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
      expect(result.maxResults).toBe(1);
    });

    it('returns empty values for a filter with no associated boards', async () => {
      // Create a fresh filter not linked to any board
      const FilterSchema = await import('zod').then(({ z }) => z.object({ id: z.coerce.number() }));

      const orphanFilter = await http.sendRequest({
        url: '/rest/api/3/filter',
        method: 'POST',
        body: {
          name: `sdk-live-orphan-filter-${Date.now()}`,
          jql: `project = ${resolvedProject!.projectKey} ORDER BY Rank ASC`,
        },
        schema: FilterSchema,
      });

      try {
        const result = await live.client.board.getBoardByFilterId({ filterId: orphanFilter.id });

        expect(Array.isArray(result.values)).toBe(true);
        expect(result.values ?? []).toHaveLength(0);
      } finally {
        await http.sendRequest({ url: `/rest/api/3/filter/${orphanFilter.id}`, method: 'DELETE' }).catch(() => {});
      }
    });

    it('returns empty values for a nonexistent filter ID', async () => {
      // The Jira API does not 404 for unknown filter IDs — it returns an empty page
      const result = await live.client.board.getBoardByFilterId({ filterId: 999_999_999 });

      expect(Array.isArray(result.values)).toBe(true);
      expect(result.values ?? []).toHaveLength(0);
    });
  });

  describe('getConfiguration', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a GetConfiguration-shaped response with id, name, type, and self', async () => {
      const result = await live.client.board.getConfiguration({ boardId });

      expect(result.id).toBe(boardId);
      expect(typeof result.name).toBe('string');
      expect(typeof result.type).toBe('string');
      expect(typeof result.self).toBe('string');
    });

    it('type is scrum for the isolated test board', async () => {
      const result = await live.client.board.getConfiguration({ boardId });

      expect(result.type).toBe('scrum');
    });

    it('filter references the board filter', async () => {
      const result = await live.client.board.getConfiguration({ boardId });

      expect(result.filter).toBeDefined();
      expect(result.filter?.id).toBe(String(isolated!.filterId));
    });

    it('columnConfig contains at least one column', async () => {
      const result = await live.client.board.getConfiguration({ boardId });

      expect(Array.isArray(result.columnConfig?.columns)).toBe(true);
      expect((result.columnConfig?.columns ?? []).length).toBeGreaterThan(0);
    });

    it('ranking contains rankCustomFieldId', async () => {
      const result = await live.client.board.getConfiguration({ boardId });

      expect(typeof result.ranking?.rankCustomFieldId).toBe('number');
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getConfiguration({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getEpics', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let epicA: { id: string; key: string };
    let epicB: { id: string; key: string };

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

      const epicTypeId = await findEpicIssueTypeId(http, resolvedProject.projectKey);

      [epicA, epicB] = await Promise.all([
        createTestEpic(http, resolvedProject.projectKey, epicTypeId),
        createTestEpic(http, resolvedProject.projectKey, epicTypeId),
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

    it('returns a paginated response with values, maxResults, startAt', async () => {
      const result = await live.client.board.getEpics({ boardId });

      expect(Array.isArray(result.values)).toBe(true);
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
    });

    it('created epics appear in the result', async () => {
      const result = await live.client.board.getEpics({ boardId });
      const keys = (result.values ?? []).map(e => e.key);

      expect(keys).toContain(epicA.key);
      expect(keys).toContain(epicB.key);
    });

    it('each epic entry has id, key, and self fields', async () => {
      const result = await live.client.board.getEpics({ boardId });

      expect((result.values ?? []).length).toBeGreaterThan(0);

      for (const epic of result.values ?? []) {
        expect(typeof epic.id).toBe('number');
        expect(typeof epic.key).toBe('string');
        expect(epic.self).toBeDefined();
      }
    });

    it('maxResults — respects the page size limit', async () => {
      const result = await live.client.board.getEpics({ boardId, maxResults: 1 });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
      expect(result.maxResults).toBe(1);
    });

    it('startAt pagination — page 2 returns a different epic than page 1', async () => {
      const page1 = await live.client.board.getEpics({ boardId, maxResults: 1, startAt: 0 });
      const page2 = await live.client.board.getEpics({ boardId, maxResults: 1, startAt: 1 });

      if ((page1.values ?? []).length > 0 && (page2.values ?? []).length > 0) {
        expect(page1.values![0]!.key).not.toBe(page2.values![0]!.key);
      }
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getEpics({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getIssuesWithoutEpicForBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };

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

      [issueA, issueB] = await Promise.all([
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
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

    it('returns a SearchResults-shaped response (maxResults, startAt, total, issues)', async () => {
      const result = await live.client.board.getIssuesWithoutEpicForBoard({ boardId });

      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.issues)).toBe(true);
    });

    it('issues without an epic appear in the result', async () => {
      const result = await live.client.board.getIssuesWithoutEpicForBoard({ boardId });
      const keys = result.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).toContain(issueB.key);
    });

    it('each returned issue has id, key, and self fields', async () => {
      const result = await live.client.board.getIssuesWithoutEpicForBoard({ boardId });

      expect(result.issues.length).toBeGreaterThan(0);

      for (const issue of result.issues) {
        expect(typeof issue.id).toBe('string');
        expect(typeof issue.key).toBe('string');
        expect(issue.self).toBeDefined();
      }
    });

    it('jql filter scopes the result', async () => {
      const result = await live.client.board.getIssuesWithoutEpicForBoard({
        boardId,
        jql: `issuekey = ${issueA.key}`,
      });

      const keys = result.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).not.toContain(issueB.key);
    });

    it('maxResults — respects the page size limit', async () => {
      const result = await live.client.board.getIssuesWithoutEpicForBoard({ boardId, maxResults: 1 });

      expect(result.issues.length).toBeLessThanOrEqual(1);
      expect(result.maxResults).toBe(1);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getIssuesWithoutEpicForBoard({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getBoardIssuesForEpic', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let epicNumericId!: number;
    let epicKey!: string;
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };

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

      const epicTypeId = await findEpicIssueTypeId(http, resolvedProject.projectKey);

      const [epic, a, b] = await Promise.all([
        createTestEpic(http, resolvedProject.projectKey, epicTypeId),
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
      ]);

      epicKey = epic.key;
      issueA = a;
      issueB = b;

      await live.client.epic.moveIssuesToEpic({
        epicIdOrKey: epicKey,
        issues: [issueA.key, issueB.key],
      });

      const epics = await live.client.board.getEpics({ boardId });
      const found = (epics.values ?? []).find(e => e.key === epicKey);

      if (!found?.id) {
        throw new Error(`Could not resolve numeric id for epic ${epicKey}`);
      }

      epicNumericId = found.id;
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a SearchResults-shaped response (maxResults, startAt, total, issues)', async () => {
      const result = await live.client.board.getBoardIssuesForEpic({ boardId, epicId: epicNumericId });

      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.issues)).toBe(true);
    });

    it('issues assigned to the epic are included in the result', async () => {
      const result = await live.client.board.getBoardIssuesForEpic({ boardId, epicId: epicNumericId });
      const keys = result.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).toContain(issueB.key);
    });

    it('each returned issue has id, key, and self fields', async () => {
      const result = await live.client.board.getBoardIssuesForEpic({ boardId, epicId: epicNumericId });

      expect(result.issues.length).toBeGreaterThan(0);

      for (const issue of result.issues) {
        expect(typeof issue.id).toBe('string');
        expect(typeof issue.key).toBe('string');
        expect(issue.self).toBeDefined();
      }
    });

    it('maxResults — respects the page size limit', async () => {
      const result = await live.client.board.getBoardIssuesForEpic({
        boardId,
        epicId: epicNumericId,
        maxResults: 1,
      });

      expect(result.issues.length).toBeLessThanOrEqual(1);
      expect(result.maxResults).toBe(1);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(
        live.client.board.getBoardIssuesForEpic({ boardId: 999_999_999, epicId: epicNumericId }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent epic ID', async () => {
      await expect(live.client.board.getBoardIssuesForEpic({ boardId, epicId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getFeaturesForBoard', () => {
    let live: LiveAgileClient;
    let cloud: CloudClient;
    let teamManaged: TeamManagedTestBoard | undefined;
    let boardId!: number;

    beforeAll(async () => {
      live = createLiveAgileClient();
      cloud = createCloudClient({
        host: live.env.baseUrl,
        auth: { type: 'basic', email: live.env.email, apiToken: live.env.apiToken },
      });
      const { accountId } = getInjectedLiveProject();
      teamManaged = await createTeamManagedTestBoard(live.client, cloud, accountId, 'scrum');
      boardId = teamManaged.boardId;
      await live.client.board.getFeaturesForBoard({ boardId });
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (teamManaged) {
        await destroyTeamManagedTestBoard(cloud, teamManaged);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a GetFeaturesForBoard-shaped response with a features array', async () => {
      const result = await live.client.board.getFeaturesForBoard({ boardId });

      expect(Array.isArray(result.features)).toBe(true);
    });

    it('features array is non-empty for a supported board', async () => {
      const result = await live.client.board.getFeaturesForBoard({ boardId });

      expect((result.features ?? []).length).toBeGreaterThan(0);
    });

    it('features contain board-scoped metadata fields', async () => {
      const result = await live.client.board.getFeaturesForBoard({ boardId });
      const features = result.features ?? [];

      expect(features.length).toBeGreaterThan(0);

      for (const feature of features) {
        expect(feature.boardId).toBe(boardId);
        expect(feature.state).toBeDefined();
        expect(typeof feature.toggleLocked).toBe('boolean');
      }
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getFeaturesForBoard({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('toggleFeatures', () => {
    let live: LiveAgileClient;
    let cloud: CloudClient;
    let teamManaged: TeamManagedTestBoard | undefined;
    let boardId!: number;
    let toggleableFeature!: string;
    let originalState!: 'ENABLED' | 'DISABLED';
    let setupError: Error | undefined;
    let setupSkipReason: string | undefined;

    beforeAll(async () => {
      try {
        live = createLiveAgileClient();
        cloud = createCloudClient({
          host: live.env.baseUrl,
          auth: { type: 'basic', email: live.env.email, apiToken: live.env.apiToken },
        });
        const prepared = await createBoardWithTogglePreparation(live);
        teamManaged = prepared.board;
        boardId = teamManaged.boardId;
        toggleableFeature = prepared.feature;
        originalState = prepared.state;
      } catch (error) {
        if (isNoReversibleTogglePreparationFailure(error)) {
          setupSkipReason =
            'Jira tenant exposes no reversible board features (all toggleLocked or COMING_SOON) after board preparation retries';
        } else {
          setupError = error instanceof Error ? error : new Error(String(error));
        }
      }
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      await live.client.board
        .toggleFeatures({
          boardId,
          body: {
            boardId,
            feature: toggleableFeature,
            enabling: originalState === 'ENABLED',
          },
        })
        .catch(() => {});

      if (teamManaged) {
        await destroyTeamManagedTestBoard(cloud, teamManaged);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a ToggleFeatures-shaped response with a features array', async (ctx: TestContext) => {
      if (setupSkipReason) {
        ctx.skip(setupSkipReason);
      }

      if (setupError) throw setupError;

      const result = await live.client.board.toggleFeatures({
        boardId,
        body: {
          boardId,
          feature: toggleableFeature,
          enabling: originalState === 'DISABLED',
        },
      });

      expect(Array.isArray(result.features)).toBe(true);
    });

    it('toggled feature state is reflected in getFeaturesForBoard', async (ctx: TestContext) => {
      if (setupSkipReason) {
        ctx.skip(setupSkipReason);
      }

      if (setupError) throw setupError;

      const targetState = originalState === 'ENABLED' ? false : true;

      await live.client.board.toggleFeatures({
        boardId,
        body: {
          boardId,
          feature: toggleableFeature,
          enabling: targetState,
        },
      });

      const after = await live.client.board.getFeaturesForBoard({ boardId });
      const feature = (after.features ?? []).find(
        f =>
          f.boardFeature === toggleableFeature || f.featureId === toggleableFeature,
      );

      expect(feature).toBeDefined();
      expect(feature!.state).toBe(targetState ? 'ENABLED' : 'DISABLED');
    });

    it('toggle is reversible — restoring original state works', async (ctx: TestContext) => {
      if (setupSkipReason) {
        ctx.skip(setupSkipReason);
      }

      if (setupError) throw setupError;

      await live.client.board.toggleFeatures({
        boardId,
        body: {
          boardId,
          feature: toggleableFeature,
          enabling: originalState === 'ENABLED',
        },
      });

      const after = await live.client.board.getFeaturesForBoard({ boardId });
      const feature = (after.features ?? []).find(
        f =>
          f.boardFeature === toggleableFeature || f.featureId === toggleableFeature,
      );

      expect(feature!.state).toBe(originalState);
    });
  });

  describe('getIssuesForBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let sprintId!: number;
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };

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

      [issueA, issueB] = await Promise.all([
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
      ]);

      // Issues must be in a sprint to appear on the scrum board (not in the backlog)
      const sprint = await live.client.sprint.createSprint({
        name: `sdk-live-sprint-${Date.now()}`,
        originBoardId: boardId,
      });

      sprintId = sprint.id!;

      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: [issueA.key, issueB.key],
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

    it('returns a SearchResults-shaped response (maxResults, startAt, total, issues)', async () => {
      const result = await live.client.board.getIssuesForBoard({ boardId });

      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.issues)).toBe(true);
    });

    it('issues placed in a sprint appear on the board', async () => {
      const result = await live.client.board.getIssuesForBoard({ boardId });
      const keys = result.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).toContain(issueB.key);
    });

    it('each returned issue has id, key, and self fields', async () => {
      const result = await live.client.board.getIssuesForBoard({ boardId });

      expect(result.issues.length).toBeGreaterThan(0);

      for (const issue of result.issues) {
        expect(typeof issue.id).toBe('string');
        expect(typeof issue.key).toBe('string');
        expect(issue.self).toBeDefined();
      }
    });

    it('jql filter scopes the result', async () => {
      const result = await live.client.board.getIssuesForBoard({
        boardId,
        jql: `issuekey = ${issueA.key}`,
      });

      const keys = result.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).not.toContain(issueB.key);
    });

    it('maxResults — respects the page size limit', async () => {
      const result = await live.client.board.getIssuesForBoard({ boardId, maxResults: 1 });

      expect(result.issues.length).toBeLessThanOrEqual(1);
      expect(result.maxResults).toBe(1);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getIssuesForBoard({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getIssuesForBacklog', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let projectKey!: string;
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };

    beforeAll(async () => {
      live = createLiveAgileClient();
      http = createLiveBaseClient(live.env);
      resolvedProject = await resolveLiveTestProject(http, live.env);
      projectKey = resolvedProject.projectKey;

      try {
        isolated = await createIsolatedTestBoard(live.client, http, projectKey);
        boardId = isolated.boardId;
      } catch (e) {
        await deleteOwnedLiveProject(http, resolvedProject);
        throw e;
      }

      [issueA, issueB] = await Promise.all([createTestIssue(http, projectKey), createTestIssue(http, projectKey)]);
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a SearchResults-shaped response (maxResults, startAt, total, issues)', async () => {
      const result = await live.client.board.getIssuesForBacklog({ boardId });

      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.issues)).toBe(true);
    });

    it('issues created in the project appear in the backlog', async () => {
      const result = await live.client.board.getIssuesForBacklog({ boardId });
      const keys = result.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).toContain(issueB.key);
    });

    it('each returned issue has id, key, and self fields', async () => {
      const result = await live.client.board.getIssuesForBacklog({ boardId });

      expect(result.issues.length).toBeGreaterThan(0);

      for (const issue of result.issues) {
        expect(typeof issue.id).toBe('string');
        expect(typeof issue.key).toBe('string');
        expect(issue.self).toBeDefined();
      }
    });

    it('jql filter — returns only issues matching the query', async () => {
      const result = await live.client.board.getIssuesForBacklog({
        boardId,
        jql: `issuekey = ${issueA.key}`,
      });

      const keys = result.issues.map(issue => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).not.toContain(issueB.key);
    });

    it('maxResults — respects the page size limit', async () => {
      const result = await live.client.board.getIssuesForBacklog({ boardId, maxResults: 1 });

      expect(result.issues.length).toBeLessThanOrEqual(1);
      expect(result.maxResults).toBe(1);
    });

    it('startAt pagination — page 2 returns a different issue than page 1', async () => {
      const page1 = await live.client.board.getIssuesForBacklog({ boardId, maxResults: 1, startAt: 0 });
      const page2 = await live.client.board.getIssuesForBacklog({ boardId, maxResults: 1, startAt: 1 });

      if (page1.issues.length > 0 && page2.issues.length > 0) {
        expect(page1.issues[0]!.key).not.toBe(page2.issues[0]!.key);
      }
    });

    it('sprint issues are excluded from the backlog', async () => {
      const sprint = await live.client.sprint.createSprint({
        name: `sdk-live-sprint-${Date.now()}`,
        originBoardId: boardId,
      });

      try {
        await live.client.sprint.moveIssuesToSprintAndRank({
          sprintId: sprint.id!,
          issues: [issueA.key],
        });

        const result = await live.client.board.getIssuesForBacklog({ boardId });
        const keys = result.issues.map(issue => issue.key);

        expect(keys).not.toContain(issueA.key);
      } finally {
        await live.client.sprint.deleteSprint({ sprintId: sprint.id! }).catch(() => {});
      }
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getIssuesForBacklog({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('moveIssuesToBoard', () => {
    let live: LiveAgileClient;
    let http: Client;
    let cloud: CloudClient;
    let teamManaged: TeamManagedTestBoard | undefined;
    let boardId!: number;
    let issueA: { id: string; key: string };
    let issueB: { id: string; key: string };
    let issueC: { id: string; key: string };
    let setupError: Error | undefined;

    beforeAll(async () => {
      try {
        live = createLiveAgileClient();
        http = createLiveBaseClient(live.env);
        cloud = createCloudClient({
          host: live.env.baseUrl,
          auth: { type: 'basic', email: live.env.email, apiToken: live.env.apiToken },
        });
        teamManaged = await createCapabilityReadyBoard(live, http);
        boardId = teamManaged.boardId;

        [issueA, issueB, issueC] = await Promise.all([
          createTestIssue(http, teamManaged.projectKey),
          createTestIssue(http, teamManaged.projectKey),
          createTestIssue(http, teamManaged.projectKey),
        ]);
      } catch (error) {
        setupError = error instanceof Error ? error : new Error(String(error));
      }
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (teamManaged) {
        await destroyTeamManagedTestBoard(cloud, teamManaged);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when moving issues to the board', async () => {
      if (setupError) throw setupError;

      const result = await live.client.board.moveIssuesToBoard({
        boardId,
        issues: [issueA.key],
      });

      expect(result).toBeUndefined();
    });

    it('moved issue no longer appears in getIssuesForBacklog', async () => {
      if (setupError) throw setupError;

      await live.client.board.moveIssuesToBoard({
        boardId,
        issues: [issueB.key],
      });

      const backlog = await live.client.board.getIssuesForBacklog({
        boardId,
        jql: `issuekey = ${issueB.key}`,
      });

      const keys = backlog.issues.map(issue => issue.key);

      expect(keys).not.toContain(issueB.key);
    });

    it('moving multiple issues at once removes all of them from the backlog', async () => {
      if (setupError) throw setupError;

      await live.client.board.moveIssuesToBoard({
        boardId,
        issues: [issueC.key],
      });

      const backlog = await live.client.board.getIssuesForBacklog({ boardId });
      const keys = backlog.issues.map(issue => issue.key);

      expect(keys).not.toContain(issueC.key);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      if (setupError) throw setupError;

      await expect(
        live.client.board.moveIssuesToBoard({
          boardId: 999_999_999,
          issues: [issueA.key],
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getProjects', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a paginated response shape', async () => {
      const result = await live.client.board.getProjects({ boardId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.values)).toBe(true);
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
    });

    it('test project appears in the projects list', async () => {
      const result = await live.client.board.getProjects({ boardId });

      const found = result.values?.find(p => p.key === resolvedProject!.projectKey);

      expect(found).toBeDefined();
    });

    it('each project entry has id, key, name, and self fields', async () => {
      const result = await live.client.board.getProjects({ boardId });

      expect((result.values ?? []).length).toBeGreaterThan(0);

      for (const project of result.values ?? []) {
        expect(typeof project.id).toBe('string');
        expect(typeof project.key).toBe('string');
        expect(typeof project.name).toBe('string');
        expect(typeof project.self).toBe('string');
      }
    });

    it('respects maxResults page size', async () => {
      const result = await live.client.board.getProjects({ boardId, maxResults: 1 });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getProjects({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getProjectsFull', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a paginated response shape', async () => {
      const result = await live.client.board.getProjectsFull({ boardId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.values)).toBe(true);
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
    });

    it('test project appears in the projects list', async () => {
      const result = await live.client.board.getProjectsFull({ boardId });

      const found = result.values?.find(p => p.key === resolvedProject!.projectKey);

      expect(found).toBeDefined();
    });

    it('each project entry has id, key, and name fields', async () => {
      const result = await live.client.board.getProjectsFull({ boardId });

      expect((result.values ?? []).length).toBeGreaterThan(0);

      for (const project of result.values ?? []) {
        expect(typeof project.id).toBe('string');
        expect(typeof project.key).toBe('string');
        expect(typeof project.name).toBe('string');
      }
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getProjectsFull({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getBoardPropertyKeys', () => {
    const TEST_PROPERTY_KEY = 'sdk-live-test-board-prop';

    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterEach(async () => {
      await live.client.board
        .deleteBoardProperty({ boardId: String(boardId), propertyKey: TEST_PROPERTY_KEY })
        .catch(() => {});
    });

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a PropertyKeys-shaped response with keys array', async () => {
      const result = await live.client.board.getBoardPropertyKeys({ boardId: String(boardId) });

      expect(result).toBeDefined();
      expect(Array.isArray(result.keys)).toBe(true);
    });

    it('lists a key after setBoardProperty', async () => {
      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      const result = await live.client.board.getBoardPropertyKeys({ boardId: String(boardId) });

      const found = result.keys?.some(k => k.key === TEST_PROPERTY_KEY);
      expect(found).toBe(true);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getBoardPropertyKeys({ boardId: '999999999' })).rejects.toThrow(ApiError);
    });
  });

  describe('getBoardProperty', () => {
    const TEST_PROPERTY_KEY = 'sdk-live-test-board-prop';

    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterEach(async () => {
      await live.client.board
        .deleteBoardProperty({ boardId: String(boardId), propertyKey: TEST_PROPERTY_KEY })
        .catch(() => {});
    });

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns the key and value of a set property', async () => {
      const value = { sdkTest: true, label: 'hello' };

      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: value,
      });

      const result = await live.client.board.getBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(result.key).toBe(TEST_PROPERTY_KEY);
      expect(result.value).toEqual(value);
    });

    it('value reflects the latest write when a property is overwritten', async () => {
      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 1 },
      });

      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 2 },
      });

      const result = await live.client.board.getBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(result.value).toEqual({ version: 2 });
    });

    it('throws an ApiError for a nonexistent property key', async () => {
      await expect(
        live.client.board.getBoardProperty({
          boardId: String(boardId),
          propertyKey: 'this-key-does-not-exist',
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws an ApiError for a nonexistent board ID', async () => {
      await expect(
        live.client.board.getBoardProperty({
          boardId: '999999999',
          propertyKey: TEST_PROPERTY_KEY,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('setBoardProperty', () => {
    const TEST_PROPERTY_KEY = 'sdk-live-test-board-set-prop';

    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterEach(async () => {
      await live.client.board
        .deleteBoardProperty({ boardId: String(boardId), propertyKey: TEST_PROPERTY_KEY })
        .catch(() => {});
    });

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when creating a new property', async () => {
      const result = await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      expect(result).toBeUndefined();
    });

    it('created property is readable via getBoardProperty', async () => {
      const value = { sdkTest: true, label: 'created' };

      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: value,
      });

      const property = await live.client.board.getBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(property.key).toBe(TEST_PROPERTY_KEY);
      expect(property.value).toEqual(value);
    });

    it('returns void when overwriting an existing property', async () => {
      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 1 },
      });

      const result = await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 2 },
      });

      expect(result).toBeUndefined();
    });

    it('overwritten value is reflected in getBoardProperty', async () => {
      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 1 },
      });

      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 2 },
      });

      const property = await live.client.board.getBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(property.value).toEqual({ version: 2 });
    });

    it('key appears in getBoardPropertyKeys after being set', async () => {
      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      const { keys } = await live.client.board.getBoardPropertyKeys({ boardId: String(boardId) });

      expect(keys?.map(k => k.key)).toContain(TEST_PROPERTY_KEY);
    });

    it('throws an ApiError for a nonexistent board ID', async () => {
      await expect(
        live.client.board.setBoardProperty({
          boardId: '999999999',
          propertyKey: TEST_PROPERTY_KEY,
          propertyValue: { sdkTest: true },
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('deleteBoardProperty', () => {
    const TEST_PROPERTY_KEY = 'sdk-live-test-board-delete-prop';

    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when deleting an existing property', async () => {
      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      const result = await live.client.board.deleteBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(result).toBeUndefined();
    });

    it('deleted property is no longer accessible via getBoardProperty', async () => {
      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      await live.client.board.deleteBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      await expect(
        live.client.board.getBoardProperty({
          boardId: String(boardId),
          propertyKey: TEST_PROPERTY_KEY,
        }),
      ).rejects.toThrow(ApiError);
    });

    it('deleted key no longer appears in getBoardPropertyKeys', async () => {
      await live.client.board.setBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      await live.client.board.deleteBoardProperty({
        boardId: String(boardId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      const { keys } = await live.client.board.getBoardPropertyKeys({ boardId: String(boardId) });

      expect((keys ?? []).map(k => k.key)).not.toContain(TEST_PROPERTY_KEY);
    });

    it('throws an ApiError when deleting a nonexistent property key', async () => {
      await expect(
        live.client.board.deleteBoardProperty({
          boardId: String(boardId),
          propertyKey: 'this-key-does-not-exist',
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws an ApiError for a nonexistent board ID', async () => {
      await expect(
        live.client.board.deleteBoardProperty({
          boardId: '999999999',
          propertyKey: TEST_PROPERTY_KEY,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getAllQuickFilters', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a paginated response shape', async () => {
      const result = await live.client.board.getAllQuickFilters({ boardId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.values)).toBe(true);
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
    });

    it('each returned quick filter has id and name when present', async () => {
      const result = await live.client.board.getAllQuickFilters({ boardId });

      for (const q of result.values ?? []) {
        expect(typeof q.id).toBe('number');
        expect(typeof q.name).toBe('string');
      }
    });

    it('respects maxResults page size', async () => {
      const result = await live.client.board.getAllQuickFilters({ boardId, maxResults: 1 });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getAllQuickFilters({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getQuickFilter', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;

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
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns the same quick filter as listed by getAllQuickFilters', async () => {
      const list = await live.client.board.getAllQuickFilters({ boardId });

      const first = list.values?.[0];
      expect(first?.id).toBeDefined();

      const one = await live.client.board.getQuickFilter({
        boardId,
        quickFilterId: first!.id!,
      });

      expect(one.id).toBe(first!.id);
      expect(one.name).toBe(first!.name);
    });

    it('response includes id and name fields', async () => {
      const list = await live.client.board.getAllQuickFilters({ boardId });
      const first = list.values?.[0];
      expect(first?.id).toBeDefined();

      const one = await live.client.board.getQuickFilter({
        boardId,
        quickFilterId: first!.id!,
      });

      expect(typeof one.id).toBe('number');
      expect(typeof one.name).toBe('string');
    });

    it('throws ApiError for a nonexistent quick filter ID', async () => {
      await expect(
        live.client.board.getQuickFilter({
          boardId,
          quickFilterId: 999_999_999,
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(
        live.client.board.getQuickFilter({
          boardId: 999_999_999,
          quickFilterId: 1,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getReportsForBoard', () => {
    let live: LiveAgileClient;
    let cloud: CloudClient;
    let teamManaged: TeamManagedTestBoard | undefined;
    let boardId!: number;

    beforeAll(async () => {
      live = createLiveAgileClient();
      cloud = createCloudClient({
        host: live.env.baseUrl,
        auth: { type: 'basic', email: live.env.email, apiToken: live.env.apiToken },
      });
      const { accountId } = getInjectedLiveProject();
      teamManaged = await createTeamManagedTestBoard(live.client, cloud, accountId, 'scrum');
      boardId = teamManaged.boardId;
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (teamManaged) {
        await destroyTeamManagedTestBoard(cloud, teamManaged);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a response with a reports array', async () => {
      const result = await live.client.board.getReportsForBoard({ boardId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.reports)).toBe(true);
    });

    it('each report entry is a plain object when present', async () => {
      const result = await live.client.board.getReportsForBoard({ boardId });

      for (const r of result.reports ?? []) {
        expect(typeof r).toBe('object');
        expect(r).not.toBeNull();
      }
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getReportsForBoard({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getAllSprints', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let sprintId!: number;

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
        name: `sdk-live-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintId = sprint.id!;
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (sprintId) {
        await live.client.sprint.deleteSprint({ sprintId }).catch(() => {});
      }

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a paginated response shape', async () => {
      const result = await live.client.board.getAllSprints({ boardId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.values)).toBe(true);
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
    });

    it('includes the created sprint in values', async () => {
      const result = await live.client.board.getAllSprints({ boardId });

      const found = result.values?.some(s => s.id === sprintId);
      expect(found).toBe(true);
    });

    it('respects maxResults page size', async () => {
      const result = await live.client.board.getAllSprints({ boardId, maxResults: 1 });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
    });

    it('supports filtering by state', async () => {
      const result = await live.client.board.getAllSprints({ boardId, state: 'future' });

      for (const sprint of result.values ?? []) {
        expect(sprint.state).toBe('future');
      }
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getAllSprints({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('getBoardIssuesForSprint', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let sprintId!: number;
    let issueKeys: string[] = [];

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
        name: `sdk-live-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintId = sprint.id!;

      const [issue1, issue2] = await Promise.all([
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
      ]);
      issueKeys = [issue1.key, issue2.key];

      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: issueKeys,
      });
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      if (sprintId) {
        await live.client.sprint.deleteSprint({ sprintId }).catch(() => {});
      }

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a SearchResults-shaped response', async () => {
      const result = await live.client.board.getBoardIssuesForSprint({ boardId, sprintId });

      expect(Array.isArray(result.issues)).toBe(true);
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
      expect(typeof result.total).toBe('number');
    });

    it('returns issues that were moved into the sprint', async () => {
      const result = await live.client.board.getBoardIssuesForSprint({ boardId, sprintId });
      const returnedKeys = result.issues.map(issue => issue.key);

      for (const key of issueKeys) {
        expect(returnedKeys).toContain(key);
      }
    });

    it('respects maxResults page size', async () => {
      const result = await live.client.board.getBoardIssuesForSprint({ boardId, sprintId, maxResults: 1 });

      expect(result.issues.length).toBeLessThanOrEqual(1);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(
        live.client.board.getBoardIssuesForSprint({
          boardId: 999_999_999,
          sprintId,
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError for a nonexistent sprint ID', async () => {
      await expect(
        live.client.board.getBoardIssuesForSprint({
          boardId,
          sprintId: 999_999_999,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getAllVersions', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let versionName!: string;
    let versionId!: number;

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

      versionName = `sdk-v-${Date.now()}`;
      const created = await http.sendRequest({
        url: '/rest/api/3/version',
        method: 'POST',
        body: {
          name: versionName,
          project: resolvedProject.projectKey,
          released: false,
        },
        schema: VersionCreatedSchema,
      });
      versionId = created.id;
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      await http
        .sendRequest({
          url: `/rest/api/3/version/${versionId}`,
          method: 'DELETE',
        })
        .catch(() => {});

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns a paginated response shape', async () => {
      const result = await live.client.board.getAllVersions({ boardId });

      expect(result).toBeDefined();
      expect(Array.isArray(result.values)).toBe(true);
      expect(typeof result.maxResults).toBe('number');
      expect(typeof result.startAt).toBe('number');
    });

    it('includes the created version', async () => {
      const result = await live.client.board.getAllVersions({ boardId });

      const found = result.values?.find((v: Version) => v.name === versionName);
      expect(found).toBeDefined();
      expect(found?.id).toBe(versionId);
    });

    it('respects maxResults page size', async () => {
      const result = await live.client.board.getAllVersions({ boardId, maxResults: 1 });

      expect((result.values ?? []).length).toBeLessThanOrEqual(1);
    });

    it('throws ApiError for a nonexistent board ID', async () => {
      await expect(live.client.board.getAllVersions({ boardId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });
});
