import * as sinon from 'sinon';
import { AgileClient, Issue } from '../../../src/agile';
import test from "ava";

const client = new AgileClient({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let issue = new Issue(client);

test.afterEach(() => {
  issue = new Issue(client);
  sendRequestStub.reset();
});

test('getIssue should accept next parameters', t => {
  issue.getIssue({ issueIdOrKey: 'key' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/agile/1.0/issue/key');
});
