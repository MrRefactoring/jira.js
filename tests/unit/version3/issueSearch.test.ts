import * as sinon from 'sinon';
import test from 'ava';
import { IssueSearch, Version3Client } from '../../../src/version3';

const client = new Version3Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let issueSearch = new IssueSearch(client);

test.afterEach(() => {
  sendRequestStub.reset();
  issueSearch = new IssueSearch(client);
});

test('should be defined', t => {
  t.truthy(!!IssueSearch);
});

test.serial('searchForIssuesUsingJql should calls without parameters', async t => {
  await issueSearch.searchForIssuesUsingJql();

  t.truthy(sendRequestStub.calledOnce);
});

test.serial('searchForIssuesUsingJql should accept follow parameters', async t => {
  await issueSearch.searchForIssuesUsingJql({
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    maxResults: 10,
    fields: ['key', 'summary'],
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.params, {
    expand: undefined,
    fields: [
      'key',
      'summary',
    ],
    fieldsByKeys: undefined,
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    maxResults: 10,
    properties: undefined,
    startAt: undefined,
    validateQuery: undefined,
  });
});

test.serial('searchForIssuesUsingJqlPost should accept follow parameters', async t => {
  await issueSearch.searchForIssuesUsingJqlPost({
    jql: 'test JQL',
    expand: ['changelog'],
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.data, {
    expand: [
      'changelog',
    ],
    fields: undefined,
    fieldsByKeys: undefined,
    jql: 'test JQL',
    maxResults: undefined,
    properties: undefined,
    startAt: undefined,
    validateQuery: undefined,
  });
});
