import { IssueRemoteLinks, Version3Client } from '../../src/version3';
import * as sinon from "sinon";

describe('Version3 IssueRemoteLinks', () => {
  const client = new Version3Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issueRemoteLinks = new IssueRemoteLinks(client);

  afterEach(() => {
    sendRequestStub.reset();
    issueRemoteLinks = new IssueRemoteLinks(client);
  });

  it('createOrUpdateRemoteIssueLink should accept next parameters', () => {
    issueRemoteLinks.createOrUpdateRemoteIssueLink({
      issueIdOrKey: 'issue.key',
      object: [{
        url: 'http://localhost/',
        title: 'Title',
        icon: [{}],
      }],
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/3/issue/issue.key/remotelink');
    expect(callArgument.data).toEqual({
      object: [{
        url: 'http://localhost/',
        title: 'Title',
        icon: [{}],
      }],
    });
  });
});
