import test from "ava";
import * as sinon from 'sinon';
import { Version3Client, WorkflowStatuses } from '../../../src/version3';

const client = new Version3Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const workflowStatuses = new WorkflowStatuses(client);

test('getStatuses should calls without parameters', t => {
  workflowStatuses.getStatuses();

  t.truthy(sendRequestStub.calledOnce);
});
