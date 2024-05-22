import * as sinon from 'sinon';
import test from 'ava';
import { IssuePriorities, Version3Client } from '../../../src/version3/index.js';

const client = new Version3Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issuePriorities = new IssuePriorities(client);

test('getPriorities should calls without parameters', t => {
  issuePriorities.getPriorities();

  t.truthy(sendRequestStub.calledOnce);
});
