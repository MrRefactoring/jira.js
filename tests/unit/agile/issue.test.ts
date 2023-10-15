import * as sinon from 'sinon';
import { AgileClient } from '../../../src';
import test from 'ava';

test('getIssue should accept follow parameters', t => {
  const client = new AgileClient({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issue.getIssue({ issueIdOrKey: 'key' });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/agile/1.0/issue/key');
});
