import { IssueLinks, Version3Client } from '../../src/version3';
import * as sinon from "sinon";

describe('Version3 IssueLinks', () => {
  const client = new Version3Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issueLinks = new IssueLinks(client);

  it('linkIssues should calls without parameters', () => {
    issueLinks.linkIssues();

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.data).toEqual({});
  });
});
