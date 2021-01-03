import { IssuePriorities, Version2Client } from '../../src/version2';
import * as sinon from 'sinon';

describe('Version2 IssuePriorities', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issuePriorities = new IssuePriorities(client);

  afterEach(() => {
    issuePriorities = new IssuePriorities(client);
    sendRequestStub.reset();
  });

  it('getPriorities should calls without parameters', () => {
    issuePriorities.getPriorities();

    expect(sendRequestStub.calledOnce).toBeTruthy();
  });
});
