import * as sinon from 'sinon';
import { test } from 'vitest';
import { IssuePriorities, Version3Client } from '@jirajs/version3';

const client = new Version3Client({ host: 'http://localhost' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
const issuePriorities = new IssuePriorities(client);

test('getPriorities should calls without parameters', ({ expect }) => {
  issuePriorities.getPriorities();

  expect(sendRequestStub.calledOnce).toBeTruthy();
});
