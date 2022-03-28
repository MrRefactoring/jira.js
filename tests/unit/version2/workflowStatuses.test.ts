import * as sinon from 'sinon';
import test from 'ava';
import { Version2Client, WorkflowStatuses } from '../../../src/version2';

const client = new Version2Client({ host: '', newErrorHandling: true });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const workflowStatuses = new WorkflowStatuses(client);

test('getStatuses should calls without parameters', t => {
  workflowStatuses.getStatuses();

  t.truthy(sendRequestStub.calledOnce);
});
