import * as sinon from 'sinon';
import test from 'ava';
import { Version3Client } from '../../../src';

test('addWatcher should accept accountId', t => {
  const client = new Version3Client({ host: 'http://localhost', newErrorHandling: true });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueWatchers.addWatcher({ issueIdOrKey: '', accountId: '101010' });

  const callArgument = sendRequestStub.lastCall.args[0];

  t.truthy(sendRequestStub.calledOnce);
  t.is(callArgument.data, '101010');
});
