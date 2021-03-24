import * as sinon from 'sinon';
import { Myself, Version2Client } from '../../../src/version2';

describe('Version2 Myself', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let myself = new Myself(client);

  afterEach(() => {
    myself = new Myself(client);
    sendRequestStub.reset();
  });

  it('getCurrentUser should calls without parameters', () => {
    myself.getCurrentUser();

    expect(sendRequestStub.calledOnce).toBeTruthy();
  });
});
