import * as sinon from 'sinon';
import test from 'ava';
import { Version3Client } from '../../../src';

const entity = {
  entityId: 1,
  key: 'k',
  value: 'v',
};

test('updateEntityPropertiesValue should accept deprecated parameters', t => {
  const client = new Version3Client({ host: '', newErrorHandling: true });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.appMigration.updateEntityPropertiesValue({
    entityType: '1',
    transferId: '2',
    accountId: '3',
    body: [entity],
  });

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.truthy(sendRequestStub.calledOnce);
  t.truthy(callArgument.url!.endsWith('1'));
  t.is(callArgument.headers!['Atlassian-Transfer-Id'], '2');
  t.is(callArgument.headers!['Atlassian-Account-Id'], '3');
  t.is(callArgument.headers!['Content-Type'], 'application/json');
  t.deepEqual(callArgument.data, [entity]);
});

test('updateEntityPropertiesValue should accept actual parameters', t => {
  const client = new Version3Client({ host: '', newErrorHandling: true });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.appMigration.updateEntityPropertiesValue({
    entityType: '1',
    transferId: '2',
    accountId: '3',
    entities: [entity],
  });

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.truthy(sendRequestStub.calledOnce);
  t.truthy(callArgument.url!.endsWith('1'));
  t.is(callArgument.headers!['Atlassian-Transfer-Id'], '2');
  t.is(callArgument.headers!['Atlassian-Account-Id'], '3');
  t.is(callArgument.headers!['Content-Type'], 'application/json');
  t.deepEqual(callArgument.data, [entity]);
});

