import * as sinon from 'sinon';
import { test } from 'vitest';
import { Myself, Version2Client } from '../../../src/version2/index.js';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const myself = new Myself(client);

test('getCurrentUser should calls without parameters', ({ expect }) => {
  myself.getCurrentUser();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
