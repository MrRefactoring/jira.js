import * as sinon from 'sinon';
import { test } from 'vitest';
import { Version2Client } from '@jirajs';

const entity = {
  entityId: 1,
  key: 'k',
  value: 'v',
};

const config = { host: 'http://localhost' };

test('updateEntityPropertiesValue should accept actual parameters', async ({ expect }) => {
  const client = new Version2Client(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.appMigration.updateEntityPropertiesValue({
    entityType: '1',
    transferId: '2',
    accountId: '3',
    entities: [entity],
  });

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(sendRequestStub.calledOnce).toBeTruthy();
  expect(callArgument.url!.endsWith('1')).toBeTruthy();
  expect(callArgument.headers!['Atlassian-Transfer-Id']).toBe('2');
  expect(callArgument.headers!['Atlassian-Account-Id']).toBe('3');
  expect(callArgument.headers!['Content-Type']).toBe('application/json');
  expect(callArgument.data).toStrictEqual([entity]);
});
