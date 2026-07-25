import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { AgileClient } from '#/agile/createAgileClient';
import { getAgileClient, getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestBoard, TEST_PROJECT_KEY } from '../setup/fixtures';
import { testName } from '../helpers/naming';

/**
 * Live suite for the Agile `sprint` API (`createSprint`, `getSprint`, `partiallyUpdateSprint`, `updateSprint`,
 * `deleteSprint`, `getAllSprints`, `getIssuesForSprint`, and the property group).
 *
 * Sprints belong to a scrum board, so everything here is gated on one existing. Where it does, a sprint is created
 * and removed inside the run — it is board-scoped, not site-wide, which makes it safe in a way most Agile
 * configuration is not.
 *
 * The behaviour that needs a live site is the state machine. A sprint is `future`, `active` or `closed`, transitions
 * are one-way, and the API expresses them as ordinary field updates — so nothing in the types stops a caller from
 * attempting a transition that cannot happen.
 */
describe('Jira Software — sprint (live)', () => {
  const tracker = new ResourceTracker();
  let agile: AgileClient;
  let boardId: number | undefined;
  let sprintId: number | undefined;
  const name = testName('sprint').slice(0, 30);

  beforeAll(async () => {
    agile = getAgileClient();

    const boards = await agile.board.getAllBoards({
      projectKeyOrId: TEST_PROJECT_KEY,
      type: 'scrum',
      maxResults: 1,
    });

    boardId = boards.values?.[0]?.id ?? (await createTestBoard(getCloudClient(), agile, tracker)).id;
  });

  afterAll(() => tracker.cleanup());

  it('lists sprints for the scrum board', async () => {
    if (boardId === undefined) return;

    const sprints = await agile.board.getAllSprints({ boardId, maxResults: 5 });

    expect(Array.isArray(sprints.values)).toBe(true);
    expect(typeof sprints.isLast).toBe('boolean');

    for (const sprint of sprints.values ?? []) {
      expect(typeof sprint.name).toBe('string');
      expect(['future', 'active', 'closed']).toContain(sprint.state);
    }
  });

  it('creates a sprint in the future state', async () => {
    if (boardId === undefined) return;

    const sprint = await agile.sprint.createSprint({ name, originBoardId: boardId });

    expect(typeof sprint.id).toBe('number');
    expect(sprint.state).toBe('future');
    expect(sprint.originBoardId).toBe(boardId);

    sprintId = sprint.id;
    tracker.defer(async () => {
      await agile.sprint.deleteSprint({ sprintId: sprintId! });
    });
  });

  it('reads the sprint back by id', async () => {
    if (sprintId === undefined) return;

    const sprint = await agile.sprint.getSprint({ sprintId });

    expect(sprint.id).toBe(sprintId);
    expect(sprint.name).toBe(name);
  });

  it('renames the sprint through a partial update', async () => {
    if (sprintId === undefined) return;

    const renamed = `${name.slice(0, 20)}-edited`;

    await agile.sprint.partiallyUpdateSprint({ sprintId, name: renamed });

    const sprint = await agile.sprint.getSprint({ sprintId });

    expect(sprint.name).toBe(renamed);
    expect(sprint.state).toBe('future');
  });

  it('filters the board listing by sprint state', async () => {
    if (boardId === undefined || sprintId === undefined) return;

    const future = await agile.board.getAllSprints({ boardId, state: 'future', maxResults: 50 });

    expect(future.values?.map(sprint => sprint.id)).toContain(sprintId);

    const closed = await agile.board.getAllSprints({ boardId, state: 'closed', maxResults: 50 });

    expect(closed.values?.map(sprint => sprint.id)).not.toContain(sprintId);
  });

  it('reports a fresh sprint as holding no issues', async () => {
    if (sprintId === undefined) return;

    const issues = await agile.sprint.getIssuesForSprint({ sprintId, maxResults: 5 });

    expect(issues.issues).toEqual([]);
  });

  it('refuses to close a sprint that was never started', async () => {
    if (sprintId === undefined) return;

    const error = await agile.sprint.partiallyUpdateSprint({ sprintId, state: 'closed' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(400);
  });

  it('surfaces an unknown sprint as a typed NotFoundError', async () => {
    const error = await agile.sprint.getSprint({ sprintId: 99999999 }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
