import * as sinon from 'sinon';
import { WorkflowStatuses, Version3Client } from '../../src/version3';

describe('Version3 WorkflowStatuses', () => {
  const client = new Version3Client({ host: '' });
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
