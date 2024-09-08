import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version3Client } from '@jirajs';

test('linkIssues should calls without parameters', ({ expect }) => {
  const client = new Version3Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueLinks.linkIssues();

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.data).toStrictEqual({
    comment: undefined,
    inwardIssue: undefined,
    outwardIssue: undefined,
    type: undefined,
  });
});
