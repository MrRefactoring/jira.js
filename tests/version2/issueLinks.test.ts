import * as sinon from 'sinon';
import { IssueLinks, Version2Client } from '../../src/version2';

describe('Version2 IssueLinks', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issueLinks = new IssueLinks(client);

  afterEach(() => {
    issueLinks = new IssueLinks(client);
    sendRequestStub.reset();
  });

  it('linkIssues should calls without parameters', () => {
    issueLinks.linkIssues();

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.data).toEqual({});
  });
});
