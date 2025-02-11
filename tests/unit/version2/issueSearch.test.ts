import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssueSearch, Version2Client } from '@jirajs/version2';

const config = { host: 'http://localhost' };

test('should be defined', ({ expect }) => {
  expect(!!IssueSearch).toBeTruthy();
});

test('searchForIssuesUsingJql should calls without parameters', ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchForIssuesUsingJql();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});

test('searchForIssuesUsingJql should accept follow parameters', ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchForIssuesUsingJql({
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

test('searchForIssuesUsingJqlPost should accept follow parameters', ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchForIssuesUsingJqlPost({
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

test('searchAndReconsileIssuesUsingJql should calls without parameters', ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchAndReconsileIssuesUsingJql();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});

test('searchAndReconsileIssuesUsingJql should accept follow parameters', ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchAndReconsileIssuesUsingJql({
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

test('searchAndReconsileIssuesUsingJqlPost should accept follow parameters', ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchAndReconsileIssuesUsingJqlPost({
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
    failFast: undefined,
    reconcileIssues: undefined,
  });
});
