import * as sinon from 'sinon';
import { BaseClient } from '../../../src';
import test from "ava";

const XAtlassianToken = 'X-Atlassian-Token';

test('should create X-Atlassian-Token: no-check header in requests', t => {
  const client = new BaseClient({
    host: '',
    noCheckAtlassianToken: true,
  });

  // @ts-ignore
  const defaultHeaders: Record<string, string> = client.instance.defaults.headers || {};

  t.is(defaultHeaders[XAtlassianToken], 'no-check');

  const sendRequestStub = sinon.stub(client, 'sendRequest');

  // @ts-ignore
  client.sendRequest({}, undefined); // TODO problem with never type

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.headers?.[XAtlassianToken], undefined);
});

test('should not create X-Atlassian-Token: no-check header in requests case 1', t => {
  const client = new BaseClient({
    host: '',
    noCheckAtlassianToken: false,
  });

  // @ts-ignore
  const defaultHeaders: Record<string, string> = client.instance.defaults.headers || {};

  t.is<string | undefined, undefined>(defaultHeaders[XAtlassianToken], undefined);

  const sendRequestStub = sinon.stub(client, 'sendRequest');

  // @ts-ignore
  client.sendRequest({}, undefined); // TODO problem with never type

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.headers?.[XAtlassianToken], undefined);
});

test('should create X-Atlassian-Token: no-check header in requests case 2', t => {
  const client = new BaseClient({
    host: '',
  });

  // @ts-ignore
  const defaultHeaders: Record<string, string> = client.instance.defaults.headers || {};

  t.is<string | undefined, undefined>(defaultHeaders[XAtlassianToken], undefined);

  const sendRequestStub = sinon.stub(client, 'sendRequest');

  // @ts-ignore
  client.sendRequest({}, undefined); // TODO problem with never type

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.headers?.[XAtlassianToken], undefined);
});
