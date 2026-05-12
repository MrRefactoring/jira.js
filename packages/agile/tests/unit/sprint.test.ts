import { describe, expect, it } from 'vitest';
import {
  createSprint,
  deleteSprint,
  deleteProperty,
  getIssuesForSprint,
  getPropertiesKeys,
  getProperty,
  getSprint,
  moveIssuesToSprintAndRank,
  partiallyUpdateSprint,
  setProperty,
  swapSprint,
  updateSprint,
} from '../../src/api/sprint';
import { createClientMock } from './helpers/clientMock';

describe('sprint api — request contracts', () => {
  describe('createSprint', () => {
    it('sends POST to /sprint with body fields', async () => {
      const { client, lastCall } = createClientMock({});

      await createSprint(client as never, {
        name: 'Sprint 1',
        originBoardId: 42,
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: '2026-01-14T00:00:00.000Z',
        goal: 'Finish auth',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint');
      expect(req.method).toBe('POST');
      expect(req.body).toEqual({
        name: 'Sprint 1',
        originBoardId: 42,
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: '2026-01-14T00:00:00.000Z',
        goal: 'Finish auth',
      });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getSprint', () => {
    it('sends GET to /sprint/:id with schema', async () => {
      const { client, lastCall } = createClientMock({});

      await getSprint(client as never, { sprintId: 7 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/7');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('partiallyUpdateSprint', () => {
    it('sends POST to /sprint/:id with partial body', async () => {
      const { client, lastCall } = createClientMock({});

      await partiallyUpdateSprint(client as never, {
        sprintId: 7,
        name: 'Sprint 1 (renamed)',
        goal: 'New goal',
        state: 'active',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/7');
      expect(req.method).toBe('POST');
      const body = req.body as Record<string, unknown>;
      expect(body.name).toBe('Sprint 1 (renamed)');
      expect(body.goal).toBe('New goal');
      expect(body.state).toBe('active');
      expect(req.schema).toBeDefined();
    });
  });

  describe('updateSprint', () => {
    it('sends PUT to /sprint/:id with full body', async () => {
      const { client, lastCall } = createClientMock({});

      await updateSprint(client as never, {
        sprintId: 12,
        name: 'Sprint 2',
        originBoardId: 42,
        startDate: '2026-01-15T00:00:00.000Z',
        endDate: '2026-01-29T00:00:00.000Z',
        state: 'future',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/12');
      expect(req.method).toBe('PUT');
      const body = req.body as Record<string, unknown>;
      expect(body.name).toBe('Sprint 2');
      expect(body.originBoardId).toBe(42);
      expect(req.schema).toBeDefined();
    });
  });

  describe('deleteSprint', () => {
    it('sends DELETE to /sprint/:id with no body or schema', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await deleteSprint(client as never, { sprintId: 99 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/99');
      expect(req.method).toBe('DELETE');
      expect(req.schema).toBeUndefined();
    });
  });

  describe('getIssuesForSprint', () => {
    it('sends GET to /sprint/:id/issue with JQL and pagination params', async () => {
      const { client, lastCall } = createClientMock({});

      await getIssuesForSprint(client as never, {
        sprintId: 5,
        jql: 'status = "In Progress"',
        startAt: 0,
        maxResults: 50,
        validateQuery: true,
        expand: 'changelog',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/5/issue');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({
        jql: 'status = "In Progress"',
        startAt: 0,
        maxResults: 50,
        validateQuery: true,
        expand: 'changelog',
      });
      expect(req.schema).toBeDefined();
    });
  });

  describe('moveIssuesToSprintAndRank', () => {
    it('sends POST to /sprint/:id/issue with rank body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await moveIssuesToSprintAndRank(client as never, {
        sprintId: 5,
        issues: ['PROJ-1', 'PROJ-2'],
        rankAfterIssue: 'PROJ-3',
        rankCustomFieldId: 10020,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/5/issue');
      expect(req.method).toBe('POST');
      const body = req.body as Record<string, unknown>;
      expect(body.issues).toEqual(['PROJ-1', 'PROJ-2']);
      expect(body.rankAfterIssue).toBe('PROJ-3');
      expect(body.rankCustomFieldId).toBe(10020);
    });
  });

  describe('getPropertiesKeys', () => {
    it('sends GET to /sprint/:id/properties', async () => {
      const { client, lastCall } = createClientMock({});

      await getPropertiesKeys(client as never, { sprintId: '3' });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/3/properties');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('getProperty', () => {
    it('interpolates both sprintId and propertyKey into URL', async () => {
      const { client, lastCall } = createClientMock({});

      await getProperty(client as never, { sprintId: '3', propertyKey: 'myKey' });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/3/properties/myKey');
      expect(req.method).toBe('GET');
      expect(req.schema).toBeDefined();
    });
  });

  describe('setProperty', () => {
    it('sends PUT with arbitrary value as body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await setProperty(client as never, {
        sprintId: '3',
        propertyKey: 'teamSize',
        propertyValue: { count: 5 },
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/3/properties/teamSize');
      expect(req.method).toBe('PUT');
      expect(req.body).toEqual({ count: 5 });
    });
  });

  describe('deleteProperty', () => {
    it('sends DELETE to /properties/:key', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await deleteProperty(client as never, { sprintId: '3', propertyKey: 'myKey' });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/3/properties/myKey');
      expect(req.method).toBe('DELETE');
    });
  });

  describe('swapSprint', () => {
    it('sends POST to /sprint/:id/swap with sprintToSwapWith body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await swapSprint(client as never, { sprintId: 10, sprintToSwapWith: 11 });

      const req = lastCall();
      expect(req.url).toBe('/rest/agile/1.0/sprint/10/swap');
      expect(req.method).toBe('POST');
      expect(req.body).toEqual({ sprintToSwapWith: 11 });
    });
  });
});
