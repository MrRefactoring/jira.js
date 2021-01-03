import { IssueLinks, Version2Client } from '../../src/version2';
import * as sinon from "sinon";

describe('Version2 IssueLinks', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issueLinks = new IssueLinks(client);

  it('linkIssues should calls without parameters', () => {
    issueLinks.linkIssues();

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.data).toEqual({});
  });
});
