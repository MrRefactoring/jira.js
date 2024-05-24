import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssuePriorities, Version2Client } from '../../../src/version2/index.js';

const client = new Version2Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issuePriorities = new IssuePriorities(client);

test('getPriorities should calls without parameters', ({ expect }) => {
  issuePriorities.getPriorities();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
