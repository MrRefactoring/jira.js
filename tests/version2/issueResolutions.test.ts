import { IssueResolutions, Version2Client } from '../../src/version2';
import * as sinon from 'sinon';

describe('Version2 IssueResolutions', () => {
  const client = new Version2Client({ host: '' });
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
