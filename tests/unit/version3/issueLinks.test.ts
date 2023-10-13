import * as sinon from 'sinon';
import test from 'ava';
import { Version3Client } from '../../../src';

test('linkIssues should calls without parameters', t => {
  const client = new Version3Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueLinks.linkIssues();

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.data, {
    comment: undefined,
    inwardIssue: undefined,
    outwardIssue: undefined,
    type: undefined,
  });
});
