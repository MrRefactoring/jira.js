import * as sinon from 'sinon';
import test from 'ava';
import { IssueSearch, Version2Client } from '../../../src/version2';

const config = { host: '', newErrorHandling: true };

test('should be defined', t => {
  t.truthy(!!IssueSearch);
});

test('searchForIssuesUsingJql should calls without parameters', t => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchForIssuesUsingJql();

  t.truthy(sendRequestStub.calledOnce);
});

test('searchForIssuesUsingJql should accept follow parameters', t => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchForIssuesUsingJql({
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    maxResults: 10,
    fields: ['key', 'summary'],
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.params, {
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

test('searchForIssuesUsingJqlPost should accept follow parameters', t => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueSearch.searchForIssuesUsingJqlPost({
    jql: 'test JQL',
    expand: ['changelog'],
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.data, {
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
