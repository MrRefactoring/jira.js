import * as sinon from 'sinon';
import test from 'ava';
import { Version2Client, WorkflowStatuses } from '../../../src/version2/index.js';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const workflowStatuses = new WorkflowStatuses(client);

test('getStatuses should calls without parameters', t => {
  workflowStatuses.getStatuses();

  t.truthy(sendRequestStub.calledOnce);
});
