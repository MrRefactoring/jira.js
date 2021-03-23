import * as sinon from 'sinon';
import { WorkflowStatuses, Version2Client } from '../../../src/version2';

describe('Version2 WorkflowStatuses', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let workflowStatuses = new WorkflowStatuses(client);

  afterEach(() => {
    sendRequestStub.reset();
    workflowStatuses = new WorkflowStatuses(client);
  });

  it('getStatuses should calls without parameters', () => {
    workflowStatuses.getStatuses();

    expect(sendRequestStub.calledOnce).toBeTruthy();
  });
});
