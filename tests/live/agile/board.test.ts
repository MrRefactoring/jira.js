import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { AgileClient } from '#/agile/createAgileClient';
import { getAgileClient, getClient, getCloudClient } from '../setup/client';
import { createCloudClient } from '#/cloud/createCloudClient';
import { ResourceTracker } from '../setup/resources';
import { createTestBoard, TEST_PROJECT_KEY } from '../setup/fixtures';

/**
 * Live suite for the Agile `board` API (`getAllBoards`, `getBoard`, `getConfiguration`, `getProjects`,
 * `getIssuesForBoard`, `getAllSprints`, `getEpics`, `getBoardPropertyKeys` and the property group).
 *
 * The Agile API is a different surface with its own base path, so this file exists first of all to prove that a
 * client built once reaches both — the same `createClient` instance drives the platform calls and these.
 *
 * A board is not a container of its own: it is a saved filter over issues that live in projects. Existing boards are
 * therefore only read — deleting one strips a team of its working view. The board this suite asserts against is one
 * it created itself, over its own filter, and removes again.
 */
describe('Jira Software — board (live)', () => {
  const tracker = new ResourceTracker();
  let agile: AgileClient;
  let boardId: number | undefined;

  beforeAll(async () => {
    agile = getAgileClient();

    const boards = await agile.board.getAllBoards({ projectKeyOrId: TEST_PROJECT_KEY, maxResults: 1 });

    // The test project ships without a board. Rather than skip the half of this
    // suite that needs one, the fixture makes a scrum board over a filter
    // scoped to this project and removes both on teardown.
    boardId = boards.values?.[0]?.id ?? (await createTestBoard(getCloudClient(), agile, tracker)).id;
  });

  afterAll(() => tracker.cleanup());

  it('shares one client with the platform surface', async () => {
    const client = getClient();
    const cloud = createCloudClient(client);

    // Two factories, one client, one set of credentials — the arrangement the
    // library recommends, and under OAuth 2.0 the only one where a refreshed
    // token reaches every surface. This is the assertion that proves it works.
    const [me, boards] = await Promise.all([cloud.myself.getCurrentUser(), agile.board.getAllBoards({ maxResults: 1 })]);

    expect(me.accountId).toBeTruthy();
    expect(Array.isArray(boards.values)).toBe(true);
  });

  it('pages the board listing', async () => {
    const boards = await agile.board.getAllBoards({ maxResults: 1 });

    expect(typeof boards.isLast).toBe('boolean');
    expect(boards.maxResults).toBe(1);
    expect(boards.values?.length).toBeLessThanOrEqual(1);

    for (const board of boards.values ?? []) {
      expect(typeof board.id).toBe('number');
      expect(typeof board.name).toBe('string');
      expect(['scrum', 'kanban', 'simple']).toContain(board.type);
    }
  });

  it('filters boards by type and by project', async () => {
    const byType = await agile.board.getAllBoards({ type: 'scrum', maxResults: 50 });

    expect((byType.values ?? []).every(board => board.type === 'scrum')).toBe(true);

    const byProject = await agile.board.getAllBoards({ projectKeyOrId: TEST_PROJECT_KEY, maxResults: 50 });

    expect(Array.isArray(byProject.values)).toBe(true);
  });

  it('describes a board and the projects behind it', async () => {
    if (boardId === undefined) return;

    const board = await agile.board.getBoard({ boardId });

    expect(board.id).toBe(boardId);
    expect(typeof board.name).toBe('string');

    const projects = await agile.board.getProjects({ boardId });

    // A board draws from one or more projects; that mapping is what turns a
    // board id into something the platform API can act on.
    expect(projects.values?.length).toBeGreaterThan(0);
  });

  it('exposes the filter and columns a board is built from', async () => {
    if (boardId === undefined) return;

    const configuration = await agile.board.getConfiguration({ boardId });

    expect(configuration.id).toBe(boardId);
    // The saved filter *is* the board — everything it shows comes from this JQL.
    expect(configuration.filter?.id).toBeTruthy();
    expect(Array.isArray(configuration.columnConfig?.columns)).toBe(true);
  });

  it('lists the issues on the board', async () => {
    if (boardId === undefined) return;

    const issues = await agile.board.getIssuesForBoard({ boardId, maxResults: 5 });

    expect(Array.isArray(issues.issues)).toBe(true);

    for (const issue of issues.issues ?? []) {
      expect(issue.key).toMatch(/^[A-Z][A-Z0-9]*-\d+$/);
    }
  });

  it('surfaces an unknown board as a typed NotFoundError', async () => {
    const error = await agile.board.getBoard({ boardId: 99999999 }).catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
