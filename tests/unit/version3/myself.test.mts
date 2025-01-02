import * as sinon from 'sinon';
import { test } from 'vitest';
import { Myself, Version3Client } from '@jirajs/version3';

const client = new Version3Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const myself = new Myself(client);

test('getCurrentUser should calls without parameters', ({ expect }) => {
  myself.getCurrentUser();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
