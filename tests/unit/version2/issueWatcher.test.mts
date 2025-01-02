import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version2Client } from '@jirajs';

test('addWatcher should accept accountId', ({ expect }) => {
  const client = new Version2Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueWatchers.addWatcher({ issueIdOrKey: '', accountId: '101010' });

  const callArgument = sendRequestStub.lastCall.args[0];

  expect(sendRequestStub.calledOnce).toBeTruthy();
  expect(callArgument.data).toBe('101010');
});
