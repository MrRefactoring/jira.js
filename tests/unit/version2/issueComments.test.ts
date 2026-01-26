import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssueComments, Version2Client } from '@jirajs/version2';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueComments = new IssueComments(client);

test('addComment should accept follow parameters', async ({ expect }) => {
  await issueComments.addComment({
    issueIdOrKey: 'key',
    comment: 'test comment',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/2/issue/key/comment');
  expect(callArgument.data).toStrictEqual({
    body: 'test comment',
    author: undefined,
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
