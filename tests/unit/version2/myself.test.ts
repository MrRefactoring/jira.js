import test from "ava";
import * as sinon from 'sinon';
import { Myself, Version2Client } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const myself = new Myself(client);

test('getCurrentUser should calls without parameters', t => {
  myself.getCurrentUser();

  t.truthy(sendRequestStub.calledOnce);
});
