import * as sinon from 'sinon';
import test from 'ava';
import { IssueComments, Version2Client } from '../../../src/version2/index.js';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueComments = new IssueComments(client);

test('addComment should accept follow parameters', t => {
  issueComments.addComment({
    issueIdOrKey: 'key',
    comment: 'test comment',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/issue/key/comment');
  t.deepEqual(callArgument.data, {
    body: 'test comment',
    author: undefined,
    created: undefined,
    id: undefined,
    jsdAuthorCanSeeRequest: undefined,
    jsdPublic: undefined,
    properties: undefined,
    renderedBody: undefined,
    self: undefined,
    updateAuthor: undefined,
    updated: undefined,
    visibility: undefined,
  });
});
