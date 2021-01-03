import { IssuePriorities, Version3Client } from '../../src/version3';
import * as sinon from 'sinon';

describe('Version3 IssuePriorities', () => {
  const client = new Version3Client({ host: '' });
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
