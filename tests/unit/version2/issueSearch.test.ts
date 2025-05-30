import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssueSearch, Version2Client } from '@jirajs/version2';

const config = { host: 'http://localhost' };

test('should be defined', ({ expect }) => {
  expect(!!IssueSearch).toBeTruthy();
});

test('searchForIssuesUsingJql should calls without parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueSearch.searchForIssuesUsingJql({
    jql: '',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();
});

test('searchForIssuesUsingJql should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueSearch.searchForIssuesUsingJql({
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    maxResults: 10,
    fields: ['key', 'summary'],
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.params).toStrictEqual({
    expand: undefined,
    failFast: undefined,
    fields: ['key', 'summary'],
    fieldsByKeys: undefined,
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    maxResults: 10,
    properties: undefined,
    startAt: undefined,
    validateQuery: undefined,
  });
});

test('searchForIssuesUsingJqlPost should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueSearch.searchForIssuesUsingJqlPost({
    jql: 'test JQL',
    expand: ['changelog'],
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.data).toStrictEqual({
    expand: ['changelog'],
    fields: undefined,
    fieldsByKeys: undefined,
    jql: 'test JQL',
    maxResults: undefined,
    properties: undefined,
    startAt: undefined,
    validateQuery: undefined,
  });
});

test('searchForIssuesUsingJqlEnhancedSearch should calls without parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
    jql: '',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();
});

test('searchForIssuesUsingJqlEnhancedSearch should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueSearch.searchForIssuesUsingJqlEnhancedSearch({
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    maxResults: 10,
    fields: ['key', 'summary'],
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.params).toStrictEqual({
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    nextPageToken: undefined,
    maxResults: 10,
    fields: ['key', 'summary'],
    expand: undefined,
    properties: undefined,
    fieldsByKeys: undefined,
    failFast: undefined,
    reconcileIssues: undefined,
  });
});

test('searchForIssuesUsingJqlEnhancedSearchPost should accept follow parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueSearch.searchForIssuesUsingJqlEnhancedSearchPost({
    jql: 'test JQL',
    expand: ['changelog'],
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.data).toStrictEqual({
    jql: 'test JQL',
    nextPageToken: undefined,
    maxResults: undefined,
    fields: undefined,
    expand: ['changelog'],
    properties: undefined,
    fieldsByKeys: undefined,
    reconcileIssues: undefined,
  });
});
