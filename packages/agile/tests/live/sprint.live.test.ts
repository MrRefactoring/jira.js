import type { Client } from '@jira.js/base';
import { ApiError } from '@jira.js/base';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
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
import { BOARD_SETUP_TIMEOUT, TEST_PROPERTY_KEY, TEST_PROPERTY_VALUE } from './helpers/liveTestConstants';

interface SprintPage {
  values: Array<{ id: number; name: string; state: string }>;
}

async function getSprintOrder(live: LiveAgileClient, boardId: number): Promise<number[]> {
  const page = (await live.client.board.getAllSprints({ boardId, state: 'future' })) as SprintPage;

  return page.values.map(s => s.id);
}

describe('sprint — live', () => {
  describe('createSprint', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    const createdSprintIds: number[] = [];

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
      const ids = createdSprintIds.splice(0);

      for (const id of ids) {
        await live.client.sprint.deleteSprint({ sprintId: id }).catch(() => {});
      }
    });

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('creates a sprint with name and originBoardId (minimal valid payload)', async () => {
      const name = `sdk-live-test-${Date.now()}`;

      const sprint = await live.client.sprint.createSprint({ name, originBoardId: boardId });

      createdSprintIds.push(sprint.id!);

      expect(sprint.id).toBeDefined();
      expect(typeof sprint.id).toBe('number');
      expect(sprint.name).toBe(name);
      expect(sprint.originBoardId).toBe(boardId);
      expect(sprint.state).toBe('future');
      expect(sprint.self).toBeDefined();
      expect(typeof sprint.self).toBe('string');
    });

    it('response self URL contains the sprint ID', async () => {
      const name = `sdk-live-test-${Date.now()}`;

      const sprint = await live.client.sprint.createSprint({ name, originBoardId: boardId });

      createdSprintIds.push(sprint.id!);

      expect(sprint.self).toContain(`/rest/agile/1.0/sprint/${sprint.id}`);
    });

    it('creates a sprint with startDate and endDate as ISO strings', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const startDate = '2030-01-01T00:00:00.000Z';
      const endDate = '2030-01-15T00:00:00.000Z';

      const sprint = await live.client.sprint.createSprint({ name, originBoardId: boardId, startDate, endDate });

      createdSprintIds.push(sprint.id!);

      expect(sprint.id).toBeDefined();
      expect(sprint.startDate).toBeInstanceOf(Date);
      expect(sprint.endDate).toBeInstanceOf(Date);
      expect(sprint.startDate!.getFullYear()).toBe(2030);
      expect(sprint.startDate!.getMonth()).toBe(0); // January
      expect(sprint.endDate!.getFullYear()).toBe(2030);
    });

    it('creates a sprint with startDate and endDate as Date objects', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const startDate = new Date('2030-02-01T00:00:00.000Z');
      const endDate = new Date('2030-02-15T00:00:00.000Z');

      const sprint = await live.client.sprint.createSprint({ name, originBoardId: boardId, startDate, endDate });

      createdSprintIds.push(sprint.id!);

      expect(sprint.id).toBeDefined();
      expect(sprint.startDate).toBeInstanceOf(Date);
      expect(sprint.endDate).toBeInstanceOf(Date);
      expect(sprint.startDate!.getFullYear()).toBe(2030);
      expect(sprint.endDate!.getMonth()).toBe(1); // February
    });

    it('creates a sprint with a goal', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const goal = 'Deliver SDK live test suite';

      const sprint = await live.client.sprint.createSprint({ name, originBoardId: boardId, goal });

      createdSprintIds.push(sprint.id!);

      expect(sprint.id).toBeDefined();
      expect(sprint.goal).toBe(goal);
    });

    it('creates a sprint with all optional fields set', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const goal = 'Full-field live test';
      const startDate = '2030-03-01T00:00:00.000Z';
      const endDate = '2030-03-15T00:00:00.000Z';

      const sprint = await live.client.sprint.createSprint({
        name,
        originBoardId: boardId,
        goal,
        startDate,
        endDate,
      });

      createdSprintIds.push(sprint.id!);

      expect(sprint.id).toBeDefined();
      expect(sprint.name).toBe(name);
      expect(sprint.goal).toBe(goal);
      expect(sprint.originBoardId).toBe(boardId);
      expect(sprint.state).toBe('future');
      expect(sprint.startDate).toBeInstanceOf(Date);
      expect(sprint.endDate).toBeInstanceOf(Date);
      expect(sprint.self).toContain('/rest/agile/1.0/sprint/');
    });

    it('trims leading and trailing whitespace from the sprint name', async () => {
      const baseName = `sdk-live-test-${Date.now()}`;
      const paddedName = `  ${baseName}  `;

      const sprint = await live.client.sprint.createSprint({ name: paddedName, originBoardId: boardId });

      createdSprintIds.push(sprint.id!);

      // Jira API trims sprint names per the API documentation
      expect(sprint.name).toBe(baseName);
    });

    it('created sprint has no completeDate by default', async () => {
      const name = `sdk-live-test-${Date.now()}`;

      const sprint = await live.client.sprint.createSprint({ name, originBoardId: boardId });

      createdSprintIds.push(sprint.id!);

      expect(sprint.completeDate).toBeUndefined();
    });

    it('throws an ApiError when originBoardId is missing', async () => {
      await expect(live.client.sprint.createSprint({ name: `sdk-live-test-${Date.now()}` })).rejects.toThrow(ApiError);
    });

    it('throws an ApiError when originBoardId references a nonexistent board', async () => {
      await expect(
        live.client.sprint.createSprint({
          name: `sdk-live-test-${Date.now()}`,
          originBoardId: 999_999_999,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getSprint', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    const createdSprintIds: number[] = [];

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
      const ids = createdSprintIds.splice(0);

      for (const id of ids) {
        await live.client.sprint.deleteSprint({ sprintId: id }).catch(() => {});
      }
    });

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns the sprint for a known sprint ID', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const created = await live.client.sprint.createSprint({ name, originBoardId: boardId });
      createdSprintIds.push(created.id!);

      const sprint = await live.client.sprint.getSprint({ sprintId: created.id! });

      expect(sprint.id).toBe(created.id);
      expect(sprint.name).toBe(name);
      expect(sprint.originBoardId).toBe(boardId);
      expect(sprint.state).toBe('future');
      expect(sprint.self).toBeDefined();
    });

    it('response self URL contains the sprint ID', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const created = await live.client.sprint.createSprint({ name, originBoardId: boardId });
      createdSprintIds.push(created.id!);

      const sprint = await live.client.sprint.getSprint({ sprintId: created.id! });

      expect(sprint.self).toContain(`/rest/agile/1.0/sprint/${created.id}`);
    });

    it('returns sprint with Date objects for startDate and endDate when set', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const startDate = '2030-01-01T00:00:00.000Z';
      const endDate = '2030-01-15T00:00:00.000Z';
      const created = await live.client.sprint.createSprint({ name, originBoardId: boardId, startDate, endDate });
      createdSprintIds.push(created.id!);

      const sprint = await live.client.sprint.getSprint({ sprintId: created.id! });

      expect(sprint.startDate).toBeInstanceOf(Date);
      expect(sprint.endDate).toBeInstanceOf(Date);
      expect(sprint.startDate!.getFullYear()).toBe(2030);
    });

    it('returns sprint with goal when set', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const goal = 'Deliver SDK live test suite';
      const created = await live.client.sprint.createSprint({ name, originBoardId: boardId, goal });
      createdSprintIds.push(created.id!);

      const sprint = await live.client.sprint.getSprint({ sprintId: created.id! });

      expect(sprint.goal).toBe(goal);
    });

    it('returns sprint with no completeDate for a future sprint', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const created = await live.client.sprint.createSprint({ name, originBoardId: boardId });
      createdSprintIds.push(created.id!);

      const sprint = await live.client.sprint.getSprint({ sprintId: created.id! });

      expect(sprint.completeDate).toBeUndefined();
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(live.client.sprint.getSprint({ sprintId: 999_999_999 })).rejects.toThrow(ApiError);
    });
  });

  describe('updateSprint', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    const createdSprintIds: number[] = [];

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
      const ids = createdSprintIds.splice(0);

      for (const id of ids) {
        await live.client.sprint.deleteSprint({ sprintId: id }).catch(() => {});
      }
    });

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('fully updates a sprint with all fields', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const updatedName = `sdk-upd-${Date.now()}`;
      const goal = 'Full update goal';
      const startDate = '2030-09-01T00:00:00.000Z';
      const endDate = '2030-09-14T00:00:00.000Z';

      const result = await live.client.sprint.updateSprint({
        sprintId: original.id!,
        id: original.id,
        name: updatedName,
        goal,
        startDate,
        endDate,
        originBoardId: boardId,
        state: 'future',
      });

      expect(result.id).toBe(original.id);
      expect(result.name).toBe(updatedName);
      expect(result.goal).toBe(goal);
      expect(result.originBoardId).toBe(boardId);
      expect(result.state).toBe('future');
      expect(result.startDate).toBeInstanceOf(Date);
      expect(result.endDate).toBeInstanceOf(Date);
    });

    it('updates the sprint name via full update', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const updatedName = `sdk-upd-${Date.now()}`;

      const result = await live.client.sprint.updateSprint({
        sprintId: original.id!,
        name: updatedName,
        originBoardId: boardId,
        state: 'future',
      });

      expect(result.id).toBe(original.id);
      expect(result.name).toBe(updatedName);
    });

    it('clears the goal when omitted from a full update', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
        goal: 'Goal to be cleared',
      });
      createdSprintIds.push(original.id!);

      const result = await live.client.sprint.updateSprint({
        sprintId: original.id!,
        name: `sdk-upd-${Date.now()}`,
        originBoardId: boardId,
        state: 'future',
        // goal intentionally omitted — full update should clear it
      });

      expect(result.goal == null || result.goal === '').toBe(true);
    });

    it('updates startDate and endDate passed as ISO strings', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const startDate = '2030-10-01T00:00:00.000Z';
      const endDate = '2030-10-15T00:00:00.000Z';

      const result = await live.client.sprint.updateSprint({
        sprintId: original.id!,
        name: `sdk-upd-${Date.now()}`,
        originBoardId: boardId,
        state: 'future',
        startDate,
        endDate,
      });

      expect(result.startDate).toBeInstanceOf(Date);
      expect(result.endDate).toBeInstanceOf(Date);
      expect(result.startDate!.getFullYear()).toBe(2030);
      expect(result.startDate!.getMonth()).toBe(9); // October
      expect(result.endDate!.getDate()).toBe(15);
    });

    it('updates startDate and endDate passed as Date objects', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const startDate = new Date('2030-11-01T00:00:00.000Z');
      const endDate = new Date('2030-11-15T00:00:00.000Z');

      const result = await live.client.sprint.updateSprint({
        sprintId: original.id!,
        name: `sdk-upd-${Date.now()}`,
        originBoardId: boardId,
        state: 'future',
        startDate,
        endDate,
      });

      expect(result.startDate).toBeInstanceOf(Date);
      expect(result.endDate).toBeInstanceOf(Date);
      expect(result.startDate!.getFullYear()).toBe(2030);
      expect(result.startDate!.getMonth()).toBe(10); // November
      expect(result.endDate!.getDate()).toBe(15);
    });

    it('transitions sprint state from future to active', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const now = new Date();
      const startDate = now.toISOString();
      const endDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();

      const result = await live.client.sprint.updateSprint({
        sprintId: original.id!,
        name: original.name!,
        originBoardId: boardId,
        state: 'active',
        startDate,
        endDate,
      });

      expect(result.state).toBe('active');
      expect(result.startDate).toBeInstanceOf(Date);
      expect(result.endDate).toBeInstanceOf(Date);
    });

    it('returns a Sprint with self URL containing the sprint ID', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const result = await live.client.sprint.updateSprint({
        sprintId: original.id!,
        name: `sdk-upd-${Date.now()}`,
        originBoardId: boardId,
        state: 'future',
      });

      expect(result.self).toContain(`/rest/agile/1.0/sprint/${original.id}`);
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(
        live.client.sprint.updateSprint({
          sprintId: 999_999_999,
          name: 'does-not-matter',
          state: 'future',
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('partiallyUpdateSprint', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    const createdSprintIds: number[] = [];

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
      const ids = createdSprintIds.splice(0);

      for (const id of ids) {
        await live.client.sprint.deleteSprint({ sprintId: id }).catch(() => {});
      }
    });

    afterAll(async () => {
      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('updates the sprint name', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const updatedName = `sdk-upd-${Date.now()}`;
      const result = await live.client.sprint.partiallyUpdateSprint({
        sprintId: original.id!,
        name: updatedName,
      });

      expect(result.id).toBe(original.id);
      expect(result.name).toBe(updatedName);
    });

    it('updates the sprint goal', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const goal = 'Updated goal from live test';
      const result = await live.client.sprint.partiallyUpdateSprint({
        sprintId: original.id!,
        goal,
      });

      expect(result.id).toBe(original.id);
      expect(result.goal).toBe(goal);
    });

    it('updates startDate and endDate', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const startDate = '2030-06-01T00:00:00.000Z';
      const endDate = '2030-06-15T00:00:00.000Z';
      const result = await live.client.sprint.partiallyUpdateSprint({
        sprintId: original.id!,
        startDate,
        endDate,
      });

      expect(result.startDate).toBeInstanceOf(Date);
      expect(result.endDate).toBeInstanceOf(Date);
      expect(result.startDate!.getFullYear()).toBe(2030);
      expect(result.startDate!.getMonth()).toBe(5); // June
      expect(result.endDate!.getDate()).toBe(15);
    });

    it('updates startDate and endDate passed as Date objects', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const startDate = new Date('2030-08-01T00:00:00.000Z');
      const endDate = new Date('2030-08-15T00:00:00.000Z');
      const result = await live.client.sprint.partiallyUpdateSprint({
        sprintId: original.id!,
        startDate,
        endDate,
      });

      expect(result.startDate).toBeInstanceOf(Date);
      expect(result.endDate).toBeInstanceOf(Date);
      expect(result.startDate!.getFullYear()).toBe(2030);
      expect(result.startDate!.getMonth()).toBe(7); // August
      expect(result.endDate!.getDate()).toBe(15);
    });

    it('updates multiple fields at once', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const updatedName = `sdk-multi-${Date.now()}`;
      const goal = 'Multi-field update test';
      const startDate = '2030-07-01T00:00:00.000Z';
      const endDate = '2030-07-14T00:00:00.000Z';

      const result = await live.client.sprint.partiallyUpdateSprint({
        sprintId: original.id!,
        name: updatedName,
        goal,
        startDate,
        endDate,
      });

      expect(result.id).toBe(original.id);
      expect(result.name).toBe(updatedName);
      expect(result.goal).toBe(goal);
      expect(result.startDate).toBeInstanceOf(Date);
      expect(result.endDate).toBeInstanceOf(Date);
    });

    it('preserves unmentioned fields when partially updating', async () => {
      const name = `sdk-live-test-${Date.now()}`;
      const goal = 'Original goal';
      const original = await live.client.sprint.createSprint({
        name,
        originBoardId: boardId,
        goal,
      });
      createdSprintIds.push(original.id!);

      const result = await live.client.sprint.partiallyUpdateSprint({
        sprintId: original.id!,
        name: `sdk-ren-${Date.now()}`,
      });

      // goal should be preserved since it was not included in the partial update
      expect(result.goal).toBe(goal);
      expect(result.originBoardId).toBe(boardId);
      expect(result.state).toBe('future');
    });

    it('returns a Sprint with self URL containing the sprint ID', async () => {
      const original = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      createdSprintIds.push(original.id!);

      const result = await live.client.sprint.partiallyUpdateSprint({
        sprintId: original.id!,
        goal: 'Self URL check',
      });

      expect(result.self).toContain(`/rest/agile/1.0/sprint/${original.id}`);
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(
        live.client.sprint.partiallyUpdateSprint({
          sprintId: 999_999_999,
          name: 'does-not-matter',
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('deleteSprint', () => {
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

    it('deletes a future sprint and returns void', async () => {
      const sprint = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });

      const result = await live.client.sprint.deleteSprint({ sprintId: sprint.id! });

      expect(result).toBeUndefined();
    });

    it('deleted sprint is no longer retrievable', async () => {
      const sprint = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });

      await live.client.sprint.deleteSprint({ sprintId: sprint.id! });

      await expect(live.client.sprint.getSprint({ sprintId: sprint.id! })).rejects.toThrow(ApiError);
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(live.client.sprint.deleteSprint({ sprintId: 999_999_999 })).rejects.toThrow(ApiError);
    });

    it('throws an ApiError when deleting an already deleted sprint', async () => {
      const sprint = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });

      await live.client.sprint.deleteSprint({ sprintId: sprint.id! });

      await expect(live.client.sprint.deleteSprint({ sprintId: sprint.id! })).rejects.toThrow(ApiError);
    });
  });

  describe('swapSprint', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let sprintAId!: number;
    let sprintBId!: number;

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

      const sprintA = await live.client.sprint.createSprint({
        name: `sdk-swap-a-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintAId = sprintA.id!;

      const sprintB = await live.client.sprint.createSprint({
        name: `sdk-swap-b-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintBId = sprintB.id!;
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      await live.client.sprint.deleteSprint({ sprintId: sprintAId }).catch(() => {});
      await live.client.sprint.deleteSprint({ sprintId: sprintBId }).catch(() => {});

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('sprints are created in order A then B', async () => {
      const order = await getSprintOrder(live, boardId);

      const indexA = order.indexOf(sprintAId);
      const indexB = order.indexOf(sprintBId);

      expect(indexA).toBeGreaterThanOrEqual(0);
      expect(indexB).toBeGreaterThanOrEqual(0);
      expect(indexA).toBeLessThan(indexB);
    });

    it('returns void when swapping two future sprints', async () => {
      const result = await live.client.sprint.swapSprint({
        sprintId: sprintAId,
        sprintToSwapWith: sprintBId,
      });

      expect(result).toBeUndefined();
    });

    it('sprint positions are exchanged after swap', async () => {
      const order = await getSprintOrder(live, boardId);

      const indexA = order.indexOf(sprintAId);
      const indexB = order.indexOf(sprintBId);

      expect(indexA).toBeGreaterThanOrEqual(0);
      expect(indexB).toBeGreaterThanOrEqual(0);
      expect(indexB).toBeLessThan(indexA);
    });

    it('swapping again restores the original order', async () => {
      await live.client.sprint.swapSprint({
        sprintId: sprintAId,
        sprintToSwapWith: sprintBId,
      });

      const order = await getSprintOrder(live, boardId);

      const indexA = order.indexOf(sprintAId);
      const indexB = order.indexOf(sprintBId);

      expect(indexA).toBeLessThan(indexB);
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(
        live.client.sprint.swapSprint({
          sprintId: 999_999_999,
          sprintToSwapWith: sprintBId,
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws an ApiError when swapping with a nonexistent sprint', async () => {
      await expect(
        live.client.sprint.swapSprint({
          sprintId: sprintAId,
          sprintToSwapWith: 999_999_999,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getIssuesForSprint', () => {
    let live: LiveAgileClient;
    let http: Client;
    let resolvedProject: ResolvedLiveProject | undefined;
    let isolated: IsolatedTestBoard | undefined;
    let boardId!: number;
    let populatedSprintId!: number;
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
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      populatedSprintId = sprint.id!;

      const [issue1, issue2] = await Promise.all([
        createTestIssue(http, resolvedProject.projectKey),
        createTestIssue(http, resolvedProject.projectKey),
      ]);

      issueKeys = [issue1.key, issue2.key];

      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId: populatedSprintId,
        issues: issueKeys,
      });
    }, BOARD_SETUP_TIMEOUT);

    afterAll(async () => {
      await live.client.sprint.deleteSprint({ sprintId: populatedSprintId }).catch(() => {});

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns empty issues list when sprint has no issues', async () => {
      const emptySprint = await live.client.sprint.createSprint({
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });

      try {
        const issuesPage = await live.client.sprint.getIssuesForSprint({ sprintId: emptySprint.id! });

        expect(issuesPage.issues).toHaveLength(0);
        expect(issuesPage.total).toBe(0);
      } finally {
        await live.client.sprint.deleteSprint({ sprintId: emptySprint.id! }).catch(() => {});
      }
    });

    it('returns issues that were moved into the sprint', async () => {
      const issuesPage = await live.client.sprint.getIssuesForSprint({ sprintId: populatedSprintId });

      expect(issuesPage.issues.length).toBeGreaterThanOrEqual(2);

      const returnedKeys = issuesPage.issues.map(issue => issue.key);

      for (const key of issueKeys) {
        expect(returnedKeys).toContain(key);
      }
    });

    it('response has expected shape (maxResults, startAt, total, issues)', async () => {
      const issuesPage = await live.client.sprint.getIssuesForSprint({ sprintId: populatedSprintId });

      expect(typeof issuesPage.maxResults).toBe('number');
      expect(typeof issuesPage.startAt).toBe('number');
      expect(typeof issuesPage.total).toBe('number');
      expect(Array.isArray(issuesPage.issues)).toBe(true);

      for (const issue of issuesPage.issues) {
        expect(typeof issue.id).toBe('string');
        expect(typeof issue.key).toBe('string');
        expect(typeof issue.self).toBe('string');
      }
    });

    it('respects maxResults parameter', async () => {
      const issuesPage = await live.client.sprint.getIssuesForSprint({
        sprintId: populatedSprintId,
        maxResults: 1,
      });

      expect(issuesPage.issues).toHaveLength(1);
      expect(issuesPage.maxResults).toBe(1);
      expect(issuesPage.total).toBeGreaterThanOrEqual(2);
    });

    it('respects startAt parameter', async () => {
      const firstIssuesPage = await live.client.sprint.getIssuesForSprint({
        sprintId: populatedSprintId,
        maxResults: 1,
        startAt: 0,
      });

      const secondIssuesPage = await live.client.sprint.getIssuesForSprint({
        sprintId: populatedSprintId,
        maxResults: 1,
        startAt: 1,
      });

      expect(firstIssuesPage.issues).toHaveLength(1);
      expect(secondIssuesPage.issues).toHaveLength(1);
      expect(firstIssuesPage.issues[0]!.key).not.toBe(secondIssuesPage.issues[0]!.key);
    });
  });

  describe('moveIssuesToSprintAndRank', () => {
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

    it('returns void when moving issues to a sprint', async () => {
      const result = await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: [issueA.key, issueB.key],
      });

      expect(result).toBeUndefined();
    });

    it('moved issues appear in getIssuesForSprint', async () => {
      const page = await live.client.sprint.getIssuesForSprint({ sprintId });

      const keys = page.issues.map((issue: Issue) => issue.key);

      expect(keys).toContain(issueA.key);
      expect(keys).toContain(issueB.key);
    });

    it('supports rankBeforeIssue — moved issue appears before the reference issue', async () => {
      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
        issues: [issueC.key],
      });

      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
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

    it('supports rankAfterIssue — moved issue appears after the reference issue', async () => {
      await live.client.sprint.moveIssuesToSprintAndRank({
        sprintId,
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

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(
        live.client.sprint.moveIssuesToSprintAndRank({
          sprintId: 999_999_999,
          issues: [issueA.key],
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws an ApiError for a nonexistent issue key', async () => {
      await expect(
        live.client.sprint.moveIssuesToSprintAndRank({
          sprintId,
          issues: ['INVALID-99999'],
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getPropertiesKeys', () => {
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
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintId = sprint.id!;
    }, BOARD_SETUP_TIMEOUT);

    afterEach(async () => {
      await live.client.sprint
        .deleteProperty({ sprintId: String(sprintId), propertyKey: TEST_PROPERTY_KEY })
        .catch(() => {});
    });

    afterAll(async () => {
      await live.client.sprint.deleteSprint({ sprintId }).catch(() => {});

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns an empty keys array when no properties are set', async () => {
      const result = await live.client.sprint.getPropertiesKeys({ sprintId: String(sprintId) });

      expect(result.keys).toEqual([]);
    });

    it('returns the key after a property is set', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: TEST_PROPERTY_VALUE,
      });

      const result = await live.client.sprint.getPropertiesKeys({ sprintId: String(sprintId) });
      const keys = (result.keys ?? []).map(k => k.key);

      expect(keys).toContain(TEST_PROPERTY_KEY);
    });

    it('each key entry has self and key fields', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: TEST_PROPERTY_VALUE,
      });

      const result = await live.client.sprint.getPropertiesKeys({ sprintId: String(sprintId) });

      expect((result.keys ?? []).length).toBeGreaterThan(0);

      for (const entry of result.keys ?? []) {
        expect(typeof entry.key).toBe('string');
        expect(typeof entry.self).toBe('string');
        expect(entry.self).toContain(String(sprintId));
        expect(entry.self).toContain(entry.key);
      }
    });

    it('key is no longer returned after the property is deleted', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: TEST_PROPERTY_VALUE,
      });

      await live.client.sprint.deleteProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      const result = await live.client.sprint.getPropertiesKeys({ sprintId: String(sprintId) });
      const keys = (result.keys ?? []).map(k => k.key);

      expect(keys).not.toContain(TEST_PROPERTY_KEY);
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(live.client.sprint.getPropertiesKeys({ sprintId: '999999999' })).rejects.toThrow(ApiError);
    });
  });

  describe('getProperty', () => {
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
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintId = sprint.id!;
    }, BOARD_SETUP_TIMEOUT);

    afterEach(async () => {
      await live.client.sprint
        .deleteProperty({ sprintId: String(sprintId), propertyKey: TEST_PROPERTY_KEY })
        .catch(() => {});
    });

    afterAll(async () => {
      await live.client.sprint.deleteSprint({ sprintId }).catch(() => {});

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns the key and value of a set property', async () => {
      const value = { sdkTest: true, label: 'hello' };

      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: value,
      });

      const result = await live.client.sprint.getProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(result.key).toBe(TEST_PROPERTY_KEY);
      expect(result.value).toEqual(value);
    });

    it('value can be a primitive string', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { value: 'hello-world' },
      });

      const result = await live.client.sprint.getProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(result.value).toEqual({ value: 'hello-world' });
    });

    it('value reflects the latest write when a property is overwritten', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 1 },
      });

      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 2 },
      });

      const result = await live.client.sprint.getProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(result.value).toEqual({ version: 2 });
    });

    it('response has key and value fields', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      const result = await live.client.sprint.getProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(typeof result.key).toBe('string');
      expect(result.value).toBeDefined();
    });

    it('throws an ApiError for a nonexistent property key', async () => {
      await expect(
        live.client.sprint.getProperty({
          sprintId: String(sprintId),
          propertyKey: 'this-key-does-not-exist',
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(
        live.client.sprint.getProperty({
          sprintId: '999999999',
          propertyKey: TEST_PROPERTY_KEY,
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('setProperty', () => {
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
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintId = sprint.id!;
    }, BOARD_SETUP_TIMEOUT);

    afterEach(async () => {
      await live.client.sprint
        .deleteProperty({ sprintId: String(sprintId), propertyKey: TEST_PROPERTY_KEY })
        .catch(() => {});
    });

    afterAll(async () => {
      await live.client.sprint.deleteSprint({ sprintId }).catch(() => {});

      if (isolated) {
        await destroyIsolatedTestBoard(live.client, http, isolated);
      }

      if (resolvedProject) {
        await deleteOwnedLiveProject(http, resolvedProject);
      }
    }, BOARD_SETUP_TIMEOUT);

    it('returns void when creating a new property', async () => {
      const result = await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      expect(result).toBeUndefined();
    });

    it('created property is readable via getProperty', async () => {
      const value = { sdkTest: true, label: 'created' };

      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: value,
      });

      const property = await live.client.sprint.getProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(property.key).toBe(TEST_PROPERTY_KEY);
      expect(property.value).toEqual(value);
    });

    it('returns void when overwriting an existing property', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 1 },
      });

      const result = await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 2 },
      });

      expect(result).toBeUndefined();
    });

    it('overwritten value is reflected in getProperty', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 1 },
      });

      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { version: 2 },
      });

      const property = await live.client.sprint.getProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(property.value).toEqual({ version: 2 });
    });

    it('key appears in getPropertiesKeys after being set', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      const { keys } = await live.client.sprint.getPropertiesKeys({ sprintId: String(sprintId) });

      expect(keys?.map(k => k.key)).toContain(TEST_PROPERTY_KEY);
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(
        live.client.sprint.setProperty({
          sprintId: '999999999',
          propertyKey: TEST_PROPERTY_KEY,
          propertyValue: { sdkTest: true },
        }),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('deleteProperty', () => {
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
        name: `sdk-live-test-${Date.now()}`,
        originBoardId: boardId,
      });
      sprintId = sprint.id!;
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

    it('returns void when deleting an existing property', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      const result = await live.client.sprint.deleteProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      expect(result).toBeUndefined();
    });

    it('deleted property is no longer accessible via getProperty', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      await live.client.sprint.deleteProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      await expect(
        live.client.sprint.getProperty({
          sprintId: String(sprintId),
          propertyKey: TEST_PROPERTY_KEY,
        }),
      ).rejects.toThrow(ApiError);
    });

    it('deleted key no longer appears in getPropertiesKeys', async () => {
      await live.client.sprint.setProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
        propertyValue: { sdkTest: true },
      });

      await live.client.sprint.deleteProperty({
        sprintId: String(sprintId),
        propertyKey: TEST_PROPERTY_KEY,
      });

      const { keys } = await live.client.sprint.getPropertiesKeys({ sprintId: String(sprintId) });

      expect((keys ?? []).map(k => k.key)).not.toContain(TEST_PROPERTY_KEY);
    });

    it('throws an ApiError when deleting a nonexistent property key', async () => {
      await expect(
        live.client.sprint.deleteProperty({
          sprintId: String(sprintId),
          propertyKey: 'this-key-does-not-exist',
        }),
      ).rejects.toThrow(ApiError);
    });

    it('throws an ApiError for a nonexistent sprint ID', async () => {
      await expect(
        live.client.sprint.deleteProperty({
          sprintId: '999999999',
          propertyKey: TEST_PROPERTY_KEY,
        }),
      ).rejects.toThrow(ApiError);
    });
  });
});
