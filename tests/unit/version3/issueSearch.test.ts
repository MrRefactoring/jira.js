import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssueSearch, Version3Client } from '../../../src/version3/index.js';

const config = { host: 'http://localhost' };

test('should be defined', ({ expect }) => {
  expect(!!IssueSearch).toBeTruthy();
});

test('searchForIssuesUsingJql should calls without parameters', ({ expect }) => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchForIssuesUsingJql();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});

test('searchForIssuesUsingJql should accept follow parameters', ({ expect }) => {
  const client = new Version3Client(config);
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
  const client = new Version3Client(config);
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
