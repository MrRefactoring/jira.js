import test from "ava";
import * as sinon from 'sinon';
import { IssueSearch, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let issueSearch = new IssueSearch(client);

test.afterEach(() => {
  sendRequestStub.reset();
  issueSearch = new IssueSearch(client);
});

test('should be defined', t => {
  t.truthy(!!IssueSearch);
});

test('searchForIssuesUsingJql should calls without parameters', t => {
  issueSearch.searchForIssuesUsingJql();

  t.truthy(sendRequestStub.calledOnce);
});

test('searchForIssuesUsingJql should accept next parameters', t => {
  issueSearch.searchForIssuesUsingJql({
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    maxResults: 10,
    fields: ['key', 'summary'],
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.params, {
    jql: 'id IN (TICKET_ID) ORDER BY key ASC',
    maxResults: 10,
    fields: ['key', 'summary'],
  });
});

test('searchForIssuesUsingJqlPost should accept next parameters', t => {
  issueSearch.searchForIssuesUsingJqlPost({
    jql: 'test JQL',
    expand: ['changelog'],
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.data, {
    jql: 'test JQL',
    expand: ['changelog'],
  });
});
