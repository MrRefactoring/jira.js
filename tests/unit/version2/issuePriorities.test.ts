import test from "ava";
import * as sinon from 'sinon';
import { IssuePriorities, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issuePriorities = new IssuePriorities(client);

test('getPriorities should calls without parameters', t => {
  issuePriorities.getPriorities();

  t.truthy(sendRequestStub.calledOnce);
});
