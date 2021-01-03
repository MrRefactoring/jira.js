import { IssueComments, Version3Client } from '../../src/version3';
import * as sinon from "sinon";

describe('Version3 IssueComments', () => {
  const client = new Version3Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let issueComments = new IssueComments(client);

  afterEach(() => {
    sendRequestStub.reset();
    issueComments = new IssueComments(client);
  });

  it('addComment should accept next parameters', () => {
    issueComments.addComment({
      issueIdOrKey: 'key',
      body: 'test comment',
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/3/issue/key/comment');
    expect(callArgument.data).toEqual({ body: 'test comment' });
  });
});
