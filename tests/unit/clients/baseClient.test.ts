import * as sinon from 'sinon';
import test from 'ava';
import { BaseClient } from '../../../src';

const XAtlassianToken = 'X-Atlassian-Token';

test('should create X-Atlassian-Token: no-check header in requests', t => {
  const client = new BaseClient({
    host: 'http://localhost',
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
    host: 'http://localhost',
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
    host: 'http://localhost',
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

test('shouldn\'t display error message for correct host urls', t => {
  // eslint-disable-next-line no-new
  new BaseClient({
    host: 'http://localhost',
  });

  // eslint-disable-next-line no-new
  new BaseClient({
    host: 'https://localhost/',
  });

  t.pass();
});

test('should display error message for incorrect host url', t => {
  const errorMessage = 'Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?';

  t.throws(() => new BaseClient({ host: '' }), { message: errorMessage });
  t.throws(() => new BaseClient({ host: 'localhost' }), { message: errorMessage });
  t.throws(() => new BaseClient({ host: 'example.com' }), { message: errorMessage });
});
