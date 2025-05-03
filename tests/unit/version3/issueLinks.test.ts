import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version3Client } from '@jirajs';

test('linkIssues should calls without parameters', async ({ expect }) => {
  const client = new Version3Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueLinks.linkIssues({
    inwardIssue: {
      id: '1',
    },
    outwardIssue: {
      id: '2',
    },
    type: {
      id: '3',
    },
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.data).toStrictEqual({
    comment: undefined,
    inwardIssue: {
      id: '1',
    },
    outwardIssue: {
      id: '2',
    },
    type: {
      id: '3',
    },
  });
});
