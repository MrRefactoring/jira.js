import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version2Client } from '@jirajs';

test('getFields should calls without parameters', ({ expect }) => {
  const client = new Version2Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueFields.getFields();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
