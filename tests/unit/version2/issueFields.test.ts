import * as sinon from 'sinon';
import test from 'ava';
import { Version2Client } from '../../../src/index.js';

test('getFields should calls without parameters', t => {
  const client = new Version2Client({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.issueFields.getFields();

  t.truthy(sendRequestStub.calledOnce);
});
