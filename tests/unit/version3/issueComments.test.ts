import * as sinon from 'sinon';
import test from 'ava';
import { Version3Client } from '../../../src';

test('addComment should accept follow parameters', t => {
  const client = new Version3Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueComments.addComment({
    issueIdOrKey: 'key',
    body: {
      type: 'doc',
      version: 1,
      text: 'Comment',
    },
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/issue/key/comment');
  t.deepEqual(callArgument.data, {
    author: undefined,
    body: {
      type: 'doc',
      version: 1,
      text: 'Comment',
    },
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

test('addComment should accept body string and convert to simple Document', t => {
  const client = new Version3Client({
    host: 'http://localhost',
  });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueComments.addComment({
    issueIdOrKey: 'key',
    body: 'Comment',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/3/issue/key/comment');
  t.deepEqual(callArgument.data, {
    author: undefined,
    body: {
      type: 'doc',
      version: 1,
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Comment' }] }],
    },
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
