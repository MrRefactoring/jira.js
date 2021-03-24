import * as sinon from 'sinon';
import { Myself, Version3Client } from '../../../src/version3';

describe('Version3 Myself', () => {
  const client = new Version3Client({ host: '' });
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
