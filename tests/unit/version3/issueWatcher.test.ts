import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version3Client } from '@jirajs';

test('addWatcher should accept accountId', async ({ expect }) => {
  const client = new Version3Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueWatchers.addWatcher({ issueIdOrKey: '', accountId: '101010' });

  const callArgument = sendRequestStub.lastCall.args[0];

  expect(sendRequestStub.calledOnce).toBeTruthy();
  expect(callArgument.body).toBe('101010');
});
