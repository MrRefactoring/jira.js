import * as sinon from 'sinon';
import test from 'ava';
import { Version3Client } from '../../../src';

test('addComment should accept follow parameters', t => {
  const client = new Version3Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueComments.addComment({
    issueIdOrKey: 'key',
    body: 'test comment',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/issue/key/comment');
  t.deepEqual(callArgument.data, {
    author: undefined,
    body: 'test comment',
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
