import * as sinon from 'sinon';
import test from 'ava';
import { Version2Client } from '../../../src';

test('getFields should calls without parameters', t => {
  const client = new Version2Client({ host: '', newErrorHandling: true });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueFields.getFields();

  t.truthy(sendRequestStub.calledOnce);
});
