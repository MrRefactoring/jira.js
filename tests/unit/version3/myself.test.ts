import test from "ava";
import * as sinon from 'sinon';
import { Myself, Version3Client } from '../../../src/version3';

const client = new Version3Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const myself = new Myself(client);

test('getCurrentUser should calls without parameters', t => {
  myself.getCurrentUser();

  t.truthy(sendRequestStub.calledOnce);
});
