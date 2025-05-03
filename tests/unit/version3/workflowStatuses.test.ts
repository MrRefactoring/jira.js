import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version3Client, WorkflowStatuses } from '@jirajs/version3';

const client = new Version3Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const workflowStatuses = new WorkflowStatuses(client);

test('getStatuses should calls without parameters', async ({ expect }) => {
  await workflowStatuses.getStatuses();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
