import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version3Client } from '@jirajs';

const config = {
  host: 'http://localhost',
};

test('getAvailableTransitions should accept follow parameters', async ({ expect }) => {
  const client = new Version3Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.issueBulkOperations.getAvailableTransitions({
    issueIdsOrKeys: ['PROJ-1', 'PROJ-2'],
    startingAfter: 'cursor1',
    endingBefore: 'cursor2',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/api/3/bulk/issues/transition');
  expect(callArgument.method).toBe('GET');
  expect(callArgument.params).toStrictEqual({
    issueIdsOrKeys: ['PROJ-1', 'PROJ-2'],
    startingAfter: 'cursor1',
    endingBefore: 'cursor2',
  });
});
