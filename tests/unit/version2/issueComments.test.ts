import test from "ava";
import * as sinon from 'sinon';
import { IssueComments, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issueComments = new IssueComments(client);

test('addComment should accept next parameters', t => {
  issueComments.addComment({
    issueIdOrKey: 'key',
    body: 'test comment',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/api/2/issue/key/comment');
  t.deepEqual(callArgument.data, { body: 'test comment' });
});
