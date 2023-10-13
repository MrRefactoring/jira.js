import * as sinon from 'sinon';
import test from 'ava';
import { Version3Client } from '../../../src';

test('getFields should calls without parameters', t => {
  const client = new Version3Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueFields.getFields();

  t.truthy(sendRequestStub.calledOnce);
});
