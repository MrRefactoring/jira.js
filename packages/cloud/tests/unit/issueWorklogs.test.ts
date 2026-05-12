import { describe, expect, it } from 'vitest';
import {
  addWorklog,
  deleteWorklog,
  getIdsOfWorklogsDeletedSince,
  getIdsOfWorklogsModifiedSince,
  getIssueWorklog,
  getWorklog,
  getWorklogsForIds,
  updateWorklog,
} from '../../src/api/issueWorklogs';
import { createClientMock } from './helpers/clientMock';

describe('issueWorklogs api — request contracts', () => {
  describe('getIssueWorklog', () => {
    it('sends GET to /worklog with pagination and filter params', async () => {
      const { client, lastCall } = createClientMock({});

      await getIssueWorklog(client as never, {
        issueIdOrKey: 'PROJ-10',
        startAt: 0,
        maxResults: 20,
        startedAfter: 1700000000000,
        startedBefore: 1700999999999,
        expand: 'properties',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-10/worklog');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({
        startAt: 0,
        maxResults: 20,
        startedAfter: 1700000000000,
        startedBefore: 1700999999999,
        expand: 'properties',
      });
      expect(req.schema).toBeDefined();
    });
  });

  describe('addWorklog', () => {
    it('sends POST to /worklog with query params and full body', async () => {
      const { client, lastCall } = createClientMock({});

      await addWorklog(client as never, {
        issueIdOrKey: 'PROJ-5',
        notifyUsers: false,
        adjustEstimate: 'leave',
        expand: 'properties',
        timeSpent: '3h',
        timeSpentSeconds: 10800,
        started: '2026-01-01T10:00:00.000+0000',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-5/worklog');
      expect(req.method).toBe('POST');
      expect(req.searchParams).toEqual({
        notifyUsers: false,
        adjustEstimate: 'leave',
        newEstimate: undefined,
        reduceBy: undefined,
        expand: 'properties',
        overrideEditableFlag: undefined,
      });
      const body = req.body as Record<string, unknown>;
      expect(body.timeSpent).toBe('3h');
      expect(body.timeSpentSeconds).toBe(10800);
      expect(req.schema).toBeDefined();
    });
  });

  describe('getWorklog', () => {
    it('interpolates both issueIdOrKey and worklog id into URL', async () => {
      const { client, lastCall } = createClientMock({});

      await getWorklog(client as never, {
        issueIdOrKey: 'PROJ-22',
        id: '10055',
        expand: 'properties',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-22/worklog/10055');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ expand: 'properties' });
      expect(req.schema).toBeDefined();
    });
  });

  describe('updateWorklog', () => {
    it('sends PUT with path params, query params, and body', async () => {
      const { client, lastCall } = createClientMock({});

      await updateWorklog(client as never, {
        issueIdOrKey: 'PROJ-7',
        id: '20001',
        notifyUsers: true,
        adjustEstimate: 'new',
        newEstimate: '2h',
        timeSpent: '1h',
        started: '2026-01-02T09:00:00.000+0000',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-7/worklog/20001');
      expect(req.method).toBe('PUT');
      expect((req.searchParams as Record<string, unknown>).notifyUsers).toBe(true);
      expect((req.searchParams as Record<string, unknown>).newEstimate).toBe('2h');
      expect((req.body as Record<string, unknown>).timeSpent).toBe('1h');
      expect(req.schema).toBeDefined();
    });
  });

  describe('deleteWorklog', () => {
    it('sends DELETE with path params and query params', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await deleteWorklog(client as never, {
        issueIdOrKey: 'PROJ-9',
        id: '30033',
        notifyUsers: false,
        adjustEstimate: 'manual',
        newEstimate: '4h',
        increaseBy: '30m',
        overrideEditableFlag: true,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-9/worklog/30033');
      expect(req.method).toBe('DELETE');
      expect(req.searchParams).toEqual({
        notifyUsers: false,
        adjustEstimate: 'manual',
        newEstimate: '4h',
        increaseBy: '30m',
        overrideEditableFlag: true,
      });
    });
  });

  describe('getIdsOfWorklogsDeletedSince', () => {
    it('sends GET to /worklog/deleted with optional since param', async () => {
      const { client, lastCall } = createClientMock({});

      await getIdsOfWorklogsDeletedSince(client as never, { since: 1700000000000 });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/worklog/deleted');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ since: 1700000000000 });
      expect(req.schema).toBeDefined();
    });

    it('works without parameters', async () => {
      const { client, lastCall } = createClientMock({});

      await getIdsOfWorklogsDeletedSince(client as never);

      expect(lastCall().url).toBe('/rest/api/3/worklog/deleted');
    });
  });

  describe('getWorklogsForIds', () => {
    it('sends POST to /worklog/list with ids body and expand query param', async () => {
      const { client, lastCall } = createClientMock([]);

      await getWorklogsForIds(client as never, {
        ids: [100, 200, 300],
        expand: 'properties',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/worklog/list');
      expect(req.method).toBe('POST');
      expect(req.searchParams).toEqual({ expand: 'properties' });
      expect(req.body).toEqual({ ids: [100, 200, 300] });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getIdsOfWorklogsModifiedSince', () => {
    it('sends GET to /worklog/updated with since and expand params', async () => {
      const { client, lastCall } = createClientMock({});

      await getIdsOfWorklogsModifiedSince(client as never, {
        since: 1699000000000,
        expand: 'properties',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/worklog/updated');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ since: 1699000000000, expand: 'properties' });
      expect(req.schema).toBeDefined();
    });
  });
});
