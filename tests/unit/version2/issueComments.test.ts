import * as sinon from 'sinon';
import { IssueComments, Version2Client } from '../../../src/version2';

describe('Version2 IssueComments', () => {
  const client = new Version2Client({ host: '' });
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

    expect(callArgument.url).toBe('/rest/api/2/issue/key/comment');
    expect(callArgument.data).toEqual({ body: 'test comment' });
  });
});
