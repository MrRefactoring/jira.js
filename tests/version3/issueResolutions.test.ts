import * as sinon from 'sinon';
import { IssueResolutions, Version3Client } from '../../src/version3';

describe('Version3 IssueResolutions', () => {
  const client = new Version3Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issueResolutions = new IssueResolutions(client);

  afterEach(() => {
    issueResolutions = new IssueResolutions(client);
    sendRequestStub.reset();
  });

  it('getResolutions should calls without parameters', () => {
    issueResolutions.getResolutions();

    expect(sendRequestStub.calledOnce).toBeTruthy();
  });
});
