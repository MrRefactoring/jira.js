import * as sinon from 'sinon';
import { test } from 'vitest';
import { Myself, Version2Client } from '@jirajs/version2';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const myself = new Myself(client);

test('getCurrentUser should calls without parameters', async ({ expect }) => {
  await myself.getCurrentUser();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
