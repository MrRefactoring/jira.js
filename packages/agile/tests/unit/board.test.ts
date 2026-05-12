import { describe, expect, it } from 'vitest';
import {
  createBoard,
  deleteBoard,
  deleteBoardProperty,
  getAllBoards,
  getAllQuickFilters,
  getAllSprints,
  getAllVersions,
  getBoard,
  getBoardByFilterId,
  getBoardIssuesForEpic,
  getBoardIssuesForSprint,
  getBoardProperty,
  getBoardPropertyKeys,
  getConfiguration,
  getEpics,
  getFeaturesForBoard,
  getIssuesForBacklog,
  getIssuesForBoard,
  getIssuesWithoutEpicForBoard,
  getProjects,
  getProjectsFull,
  getQuickFilter,
  getReportsForBoard,
  moveIssuesToBoard,
  setBoardProperty,
  toggleFeatures,
} from '../../src/api/board';
import { createClientMock } from './helpers/clientMock';

describe('board api — request contracts', () => {
  describe('getAllBoards', () => {
    it('sends GET to /board with all filter params', async () => {
      const { client, lastCall } = createClientMock({});

      await getAllBoards(client as never, {
        startAt: 0,
        maxResults: 50,
        type: 'scrum',
        name: 'My Board',
        projectKeyOrId: 'PROJ',
        accountIdLocation: 'user-123',
        includePrivate: true,
        negateLocationFiltering: false,
        orderBy: 'name',
        expand: 'admins',
        filterId: 42,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toMatchObject({
        startAt: 0,
        maxResults: 50,
        type: 'scrum',
        name: 'My Board',
        projectKeyOrId: 'PROJ',
        includePrivate: true,
        orderBy: 'name',
        filterId: 42,
      });
      expect(req.schema).toBeDefined();
    });

    it('works without parameters', async () => {
      const { client, lastCall } = createClientMock({});

      await getAllBoards(client as never);

      expect(lastCall().url).toBe('/rest/agile/1.0/board');
      expect(lastCall().method).toBe('GET');
    });
  });

  describe('createBoard', () => {
    it('sends POST to /board with name, type, filterId, location', async () => {
      const { client, lastCall } = createClientMock({});

      await createBoard(client as never, {
        name: 'Sprint Board',
        type: 'scrum',
        filterId: 101,
        location: { type: 'project', projectKeyOrId: 'PROJ' },
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board');
      expect(req.method).toBe('POST');
      expect(req.body).toEqual({
        name: 'Sprint Board',
        type: 'scrum',
        filterId: 101,
        location: { type: 'project', projectKeyOrId: 'PROJ' },
      });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getBoardByFilterId', () => {
    it('interpolates filterId into URL with pagination params', async () => {
      const { client, lastCall } = createClientMock({});

      await getBoardByFilterId(client as never, { filterId: 55, startAt: 0, maxResults: 10 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/filter/55');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ startAt: 0, maxResults: 10 });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getBoard', () => {
    it('sends GET to /board/:boardId', async () => {
      const { client, lastCall } = createClientMock({});

      await getBoard(client as never, { boardId: 7 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/7');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('deleteBoard', () => {
    it('sends DELETE to /board/:boardId with no body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await deleteBoard(client as never, { boardId: 7 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/7');
      expect(req.method).toBe('DELETE');
    });
  });

  describe('getIssuesForBacklog', () => {
    it('sends GET to /board/:id/backlog with JQL and pagination', async () => {
      const { client, lastCall } = createClientMock({});

      await getIssuesForBacklog(client as never, {
        boardId: 3,
        jql: 'status != Done',
        startAt: 0,
        maxResults: 25,
        validateQuery: true,
        expand: 'renderedFields',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/3/backlog');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({
        jql: 'status != Done',
        startAt: 0,
        maxResults: 25,
        validateQuery: true,
        expand: 'renderedFields',
      });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getConfiguration', () => {
    it('sends GET to /board/:id/configuration', async () => {
      const { client, lastCall } = createClientMock({});

      await getConfiguration(client as never, { boardId: 12 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/12/configuration');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getEpics', () => {
    it('sends GET to /board/:id/epic with done filter and pagination', async () => {
      const { client, lastCall } = createClientMock({});

      await getEpics(client as never, { boardId: 8, done: 'false', startAt: 0, maxResults: 50 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/8/epic');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ done: 'false', startAt: 0, maxResults: 50 });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getIssuesWithoutEpicForBoard', () => {
    it('sends GET to /board/:id/epic/none/issue', async () => {
      const { client, lastCall } = createClientMock({});

      await getIssuesWithoutEpicForBoard(client as never, {
        boardId: 9,
        jql: 'priority = High',
        startAt: 0,
        maxResults: 10,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/9/epic/none/issue');
      expect(req.method).toBe('GET');
      expect((req.searchParams as Record<string, unknown>).jql).toBe('priority = High');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getBoardIssuesForEpic', () => {
    it('interpolates both boardId and epicId into URL', async () => {
      const { client, lastCall } = createClientMock({});

      await getBoardIssuesForEpic(client as never, {
        boardId: 9,
        epicId: 10706,
        jql: 'status = Open',
        maxResults: 20,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/9/epic/10706/issue');
      expect(req.method).toBe('GET');
      expect((req.searchParams as Record<string, unknown>).jql).toBe('status = Open');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getFeaturesForBoard', () => {
    it('sends GET to /board/:id/features', async () => {
      const { client, lastCall } = createClientMock({});

      await getFeaturesForBoard(client as never, { boardId: 4 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/4/features');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('toggleFeatures', () => {
    it('sends PUT to /board/:id/features with body and schema', async () => {
      const toggleBody = { feature: 'BACKLOG', enabling: false };
      const { client, lastCall } = createClientMock({});

      await toggleFeatures(client as never, { boardId: 4, body: toggleBody });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/4/features');
      expect(req.method).toBe('PUT');
      expect(req.body).toBe(toggleBody);
      expect(req.schema).toBeDefined();
    });
  });

  describe('getIssuesForBoard', () => {
    it('sends GET to /board/:id/issue with JQL and pagination', async () => {
      const { client, lastCall } = createClientMock({});

      await getIssuesForBoard(client as never, {
        boardId: 6,
        jql: 'sprint in openSprints()',
        startAt: 0,
        maxResults: 100,
        validateQuery: false,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/6/issue');
      expect(req.method).toBe('GET');
      expect((req.searchParams as Record<string, unknown>).jql).toBe('sprint in openSprints()');
      expect((req.searchParams as Record<string, unknown>).maxResults).toBe(100);
      expect(req.schema).toBeDefined();
    });
  });

  describe('moveIssuesToBoard', () => {
    it('sends POST to /board/:id/issue with rank body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await moveIssuesToBoard(client as never, {
        boardId: 6,
        issues: ['PROJ-10', 'PROJ-11'],
        rankAfterIssue: 'PROJ-9',
        rankCustomFieldId: 10020,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/6/issue');
      expect(req.method).toBe('POST');
      const body = req.body as Record<string, unknown>;
      expect(body.issues).toEqual(['PROJ-10', 'PROJ-11']);
      expect(body.rankAfterIssue).toBe('PROJ-9');
    });
  });

  describe('getProjects', () => {
    it('sends GET to /board/:id/project with pagination', async () => {
      const { client, lastCall } = createClientMock({});

      await getProjects(client as never, { boardId: 2, startAt: 0, maxResults: 20 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/2/project');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ startAt: 0, maxResults: 20 });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getProjectsFull', () => {
    it('sends GET to /board/:id/project/full', async () => {
      const { client, lastCall } = createClientMock({});

      await getProjectsFull(client as never, { boardId: 2 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/2/project/full');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getBoardPropertyKeys', () => {
    it('sends GET to /board/:id/properties', async () => {
      const { client, lastCall } = createClientMock({});

      await getBoardPropertyKeys(client as never, { boardId: '5' });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/5/properties');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getBoardProperty', () => {
    it('interpolates boardId and propertyKey', async () => {
      const { client, lastCall } = createClientMock({});

      await getBoardProperty(client as never, { boardId: '5', propertyKey: 'myProp' });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/5/properties/myProp');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('setBoardProperty', () => {
    it('sends PUT with arbitrary value body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await setBoardProperty(client as never, {
        boardId: '5',
        propertyKey: 'teamInfo',
        propertyValue: { size: 8 },
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/5/properties/teamInfo');
      expect(req.method).toBe('PUT');
      expect(req.body).toEqual({ size: 8 });
    });
  });

  describe('deleteBoardProperty', () => {
    it('sends DELETE to /board/:id/properties/:key', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await deleteBoardProperty(client as never, { boardId: '5', propertyKey: 'teamInfo' });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/5/properties/teamInfo');
      expect(req.method).toBe('DELETE');
    });
  });

  describe('getAllQuickFilters', () => {
    it('sends GET to /board/:id/quickfilter with pagination', async () => {
      const { client, lastCall } = createClientMock({});

      await getAllQuickFilters(client as never, { boardId: 11, startAt: 0, maxResults: 10 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/11/quickfilter');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ startAt: 0, maxResults: 10 });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getQuickFilter', () => {
    it('interpolates boardId and quickFilterId', async () => {
      const { client, lastCall } = createClientMock({});

      await getQuickFilter(client as never, { boardId: 11, quickFilterId: 3 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/11/quickfilter/3');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getReportsForBoard', () => {
    it('sends GET to /board/:id/reports', async () => {
      const { client, lastCall } = createClientMock({});

      await getReportsForBoard(client as never, { boardId: 14 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/14/reports');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getAllSprints', () => {
    it('sends GET to /board/:id/sprint with state filter and pagination', async () => {
      const { client, lastCall } = createClientMock({});

      await getAllSprints(client as never, {
        boardId: 3,
        state: 'active',
        startAt: 0,
        maxResults: 25,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/3/sprint');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ state: 'active', startAt: 0, maxResults: 25 });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getBoardIssuesForSprint', () => {
    it('interpolates both boardId and sprintId into URL', async () => {
      const { client, lastCall } = createClientMock({});

      await getBoardIssuesForSprint(client as never, {
        boardId: 3,
        sprintId: 17,
        jql: 'assignee = currentUser()',
        maxResults: 50,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/3/sprint/17/issue');
      expect(req.method).toBe('GET');
      expect((req.searchParams as Record<string, unknown>).jql).toBe('assignee = currentUser()');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getAllVersions', () => {
    it('sends GET to /board/:id/version with released filter', async () => {
      const { client, lastCall } = createClientMock({});

      await getAllVersions(client as never, {
        boardId: 3,
        released: 'true',
        startAt: 0,
        maxResults: 50,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/board/3/version');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ released: 'true', startAt: 0, maxResults: 50 });
      expect(req.schema).toBeDefined();
    });
  });
});
