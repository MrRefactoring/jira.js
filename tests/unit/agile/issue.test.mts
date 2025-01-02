import * as sinon from 'sinon';
import { test } from 'vitest';
import { AgileClient } from '@jirajs';

test('getIssue should accept follow parameters', ({ expect }) => {
  const client = new AgileClient({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issue.getIssue({ issueIdOrKey: 'key' });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/agile/1.0/issue/key');
});
