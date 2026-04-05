import { describe, expect, it } from 'vitest';
import {
  assignIssue,
  bulkFetchIssues,
  createIssue,
  createIssues,
  deleteIssue,
  doTransition,
  editIssue,
  getBulkChangelogs,
  getChangeLogsByIds,
  getChangeLogs,
  getCreateIssueMetaIssueTypeId,
  getCreateIssueMetaIssueTypes,
  getEditIssueMeta,
  getIssue,
  getTransitions,
  notify,
} from '../../src/api/issues';
import { createClientMock } from './helpers/clientMock';

describe('issues api — request contracts', () => {
  describe('getBulkChangelogs', () => {
    it('sends POST to /changelog/bulkfetch with body fields', async () => {
      const { client, lastCall } = createClientMock({});

      await getBulkChangelogs(client as never, {
        issueIdsOrKeys: ['PROJ-1', 'PROJ-2'],
        fieldIds: ['status', 'assignee'],
        maxResults: 50,
        nextPageToken: 'tok',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/changelog/bulkfetch');
      expect(req.method).toBe('POST');
      expect(req.body).toEqual({
        issueIdsOrKeys: ['PROJ-1', 'PROJ-2'],
        fieldIds: ['status', 'assignee'],
        maxResults: 50,
        nextPageToken: 'tok',
      });
      expect(req.schema).toBeDefined();
    });
  });

  describe('createIssue', () => {
    it('sends POST to /issue with body and optional updateHistory param', async () => {
      const { client, lastCall } = createClientMock({ id: '1', key: 'PROJ-1', self: 'https://...' });

      await createIssue(client as never, {
        updateHistory: true,
        fields: { summary: 'New issue', issuetype: { name: 'Bug' } },
        properties: [{ key: 'prop', value: 'val' }],
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue');
      expect(req.method).toBe('POST');
      expect(req.searchParams).toEqual({ updateHistory: true });
      expect((req.body as Record<string, unknown>).fields).toEqual({ summary: 'New issue', issuetype: { name: 'Bug' } });
      expect(req.schema).toBeDefined();
    });

    it('body includes all mapped fields', async () => {
      const { client, lastCall } = createClientMock({});

      await createIssue(client as never, {
        fields: {},
        historyMetadata: { activityDescription: 'test' },
        transition: { id: '10' },
        update: {},
      });

      const body = lastCall().body as Record<string, unknown>;
      expect(body).toHaveProperty('historyMetadata');
      expect(body).toHaveProperty('transition');
      expect(body).toHaveProperty('update');
    });
  });

  describe('createIssues', () => {
    it('sends POST to /issue/bulk with issueUpdates body', async () => {
      const { client, lastCall } = createClientMock({});

      await createIssues(client as never, { issueUpdates: [{ fields: {} }] });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/bulk');
      expect(req.method).toBe('POST');
      expect(req.body).toEqual({ issueUpdates: [{ fields: {} }] });
      expect(req.schema).toBeDefined();
    });
  });

  describe('bulkFetchIssues', () => {
    it('sends POST to /issue/bulkfetch with body', async () => {
      const { client, lastCall } = createClientMock({});

      await bulkFetchIssues(client as never, {
        issueIdsOrKeys: ['10001', 'PROJ-5'],
        fields: ['summary', 'status'],
        expand: ['changelog'],
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/bulkfetch');
      expect(req.method).toBe('POST');
      expect((req.body as Record<string, unknown>).issueIdsOrKeys).toEqual(['10001', 'PROJ-5']);
      expect((req.body as Record<string, unknown>).fields).toEqual(['summary', 'status']);
      expect(req.schema).toBeDefined();
    });
  });

  describe('getCreateIssueMetaIssueTypes', () => {
    it('interpolates projectIdOrKey into URL and passes pagination params', async () => {
      const { client, lastCall } = createClientMock({});

      await getCreateIssueMetaIssueTypes(client as never, {
        projectIdOrKey: 'MYPROJ',
        startAt: 0,
        maxResults: 25,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/createmeta/MYPROJ/issuetypes');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ startAt: 0, maxResults: 25 });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getCreateIssueMetaIssueTypeId', () => {
    it('interpolates both projectIdOrKey and issueTypeId into URL', async () => {
      const { client, lastCall } = createClientMock({});

      await getCreateIssueMetaIssueTypeId(client as never, {
        projectIdOrKey: 'PROJ',
        issueTypeId: '10001',
        startAt: 10,
        maxResults: 50,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/createmeta/PROJ/issuetypes/10001');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ startAt: 10, maxResults: 50 });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getIssue', () => {
    it('interpolates issueIdOrKey and maps all query params', async () => {
      const { client, lastCall } = createClientMock({});

      await getIssue(client as never, {
        issueIdOrKey: 'PROJ-42',
        fields: ['summary', 'status'],
        fieldsByKeys: true,
        expand: 'renderedFields',
        properties: ['prop1'],
        updateHistory: true,
        failFast: false,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-42');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({
        fields: ['summary', 'status'],
        fieldsByKeys: true,
        expand: 'renderedFields',
        properties: ['prop1'],
        updateHistory: true,
        failFast: false,
      });
      expect(req.schema).toBeDefined();
    });
  });

  describe('editIssue', () => {
    it('sends PUT with path param, query params, and body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await editIssue(client as never, {
        issueIdOrKey: 'PROJ-99',
        notifyUsers: false,
        overrideScreenSecurity: true,
        fields: { summary: 'Updated' },
        update: {},
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-99');
      expect(req.method).toBe('PUT');
      expect((req.searchParams as Record<string, unknown>).notifyUsers).toBe(false);
      expect((req.searchParams as Record<string, unknown>).overrideScreenSecurity).toBe(true);
      expect((req.body as Record<string, unknown>).fields).toEqual({ summary: 'Updated' });
    });

    it('editIssue has no schema (void response)', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await editIssue(client as never, { issueIdOrKey: 'PROJ-1', fields: {} });

      expect(lastCall().schema).toBeUndefined();
    });
  });

  describe('deleteIssue', () => {
    it('sends DELETE with path param and optional deleteSubtasks param', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await deleteIssue(client as never, {
        issueIdOrKey: 'PROJ-55',
        deleteSubtasks: 'true',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-55');
      expect(req.method).toBe('DELETE');
      expect(req.searchParams).toEqual({ deleteSubtasks: 'true' });
    });
  });

  describe('assignIssue', () => {
    it('sends PUT to /assignee endpoint with user body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await assignIssue(client as never, {
        issueIdOrKey: 'PROJ-7',
        accountId: 'user-abc',
        displayName: 'Alice',
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-7/assignee');
      expect(req.method).toBe('PUT');
      expect((req.body as Record<string, unknown>).accountId).toBe('user-abc');
      expect((req.body as Record<string, unknown>).displayName).toBe('Alice');
    });
  });

  describe('getChangeLogs', () => {
    it('sends GET to /changelog with pagination params', async () => {
      const { client, lastCall } = createClientMock({});

      await getChangeLogs(client as never, {
        issueIdOrKey: 'PROJ-3',
        startAt: 100,
        maxResults: 50,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-3/changelog');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ startAt: 100, maxResults: 50 });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getChangeLogsByIds', () => {
    it('sends POST to /changelog/list with changelogIds body', async () => {
      const { client, lastCall } = createClientMock({});

      await getChangeLogsByIds(client as never, {
        issueIdOrKey: 'PROJ-11',
        changelogIds: [1, 2, 3],
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-11/changelog/list');
      expect(req.method).toBe('POST');
      expect(req.body).toEqual({ changelogIds: [1, 2, 3] });
      expect(req.schema).toBeDefined();
    });
  });

  describe('getEditIssueMeta', () => {
    it('sends GET to /editmeta with override flags as query params', async () => {
      const { client, lastCall } = createClientMock({});

      await getEditIssueMeta(client as never, {
        issueIdOrKey: 'PROJ-20',
        overrideScreenSecurity: true,
        overrideEditableFlag: false,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-20/editmeta');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({ overrideScreenSecurity: true, overrideEditableFlag: false });
      expect(req.schema).toBeDefined();
    });
  });

  describe('notify', () => {
    it('sends POST to /notify with notification body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await notify(client as never, {
        issueIdOrKey: 'PROJ-8',
        subject: 'Hello',
        textBody: 'Plain text',
        htmlBody: '<p>HTML</p>',
        restrict: { permissions: [{ key: 'BROWSE_PROJECTS' }] },
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-8/notify');
      expect(req.method).toBe('POST');
      const body = req.body as Record<string, unknown>;
      expect(body.subject).toBe('Hello');
      expect(body.textBody).toBe('Plain text');
      expect(body.htmlBody).toBe('<p>HTML</p>');
    });
  });

  describe('getTransitions', () => {
    it('sends GET to /transitions with all filter params', async () => {
      const { client, lastCall } = createClientMock({});

      await getTransitions(client as never, {
        issueIdOrKey: 'PROJ-15',
        expand: 'transitions.fields',
        transitionId: '21',
        skipRemoteOnlyCondition: true,
        includeUnavailableTransitions: false,
        sortByOpsBarAndStatus: true,
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-15/transitions');
      expect(req.method).toBe('GET');
      expect(req.searchParams).toEqual({
        expand: 'transitions.fields',
        transitionId: '21',
        skipRemoteOnlyCondition: true,
        includeUnavailableTransitions: false,
        sortByOpsBarAndStatus: true,
      });
      expect(req.schema).toBeDefined();
    });
  });

  describe('doTransition', () => {
    it('sends POST to /transitions with transition body', async () => {
      const { client, lastCall } = createClientMock(undefined);

      await doTransition(client as never, {
        issueIdOrKey: 'PROJ-33',
        transition: { id: '31' },
        fields: { resolution: { name: 'Done' } },
        update: {},
      });

      const req = lastCall();
      expect(req.url).toBe('/rest/api/3/issue/PROJ-33/transitions');
      expect(req.method).toBe('POST');
      const body = req.body as Record<string, unknown>;
      expect(body.transition).toEqual({ id: '31' });
      expect(body.fields).toEqual({ resolution: { name: 'Done' } });
    });
  });
});
