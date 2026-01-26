import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version3Client } from '@jirajs';

test('addComment should accept follow parameters', async ({ expect }) => {
  const client = new Version3Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueComments.addComment({
    issueIdOrKey: 'key',
    comment: {
      type: 'doc',
      version: 1,
      text: 'Comment',
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/3/issue/key/comment');
  expect(callArgument.data).toStrictEqual({
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
    parentId: undefined,
    properties: undefined,
    renderedBody: undefined,
    self: undefined,
    updateAuthor: undefined,
    updated: undefined,
    visibility: undefined,
  });
});

test('addComment should accept body string and convert to simple Document', async ({ expect }) => {
  const client = new Version3Client({
    host: 'http://localhost',
  });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueComments.addComment({
    issueIdOrKey: 'key',
    comment: 'Comment',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/3/issue/key/comment');
  expect(callArgument.data).toStrictEqual({
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
    parentId: undefined,
    properties: undefined,
    renderedBody: undefined,
    self: undefined,
    updateAuthor: undefined,
    updated: undefined,
    visibility: undefined,
  });
});
