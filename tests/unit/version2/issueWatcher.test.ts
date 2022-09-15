import * as sinon from 'sinon';
import test from 'ava';
import { Version2Client } from '../../../src';

test('addWatcher should accept accountId', t => {
  const client = new Version2Client({ host: 'http://localhost', newErrorHandling: true });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueWatchers.addWatcher({ issueIdOrKey: '', accountId: '101010' });

  const callArgument = sendRequestStub.lastCall.args[0];

  t.truthy(sendRequestStub.calledOnce);
  t.is(callArgument.data, '101010');
});
