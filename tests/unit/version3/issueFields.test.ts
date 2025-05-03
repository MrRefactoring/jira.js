import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version3Client } from '@jirajs';

test('getFields should calls without parameters', async ({ expect }) => {
  const client = new Version3Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueFields.getFields();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
