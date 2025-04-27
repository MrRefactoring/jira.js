import * as sinon from 'sinon';
import { test } from 'vitest';
import { BaseClient } from '@jirajs';

const XAtlassianToken = 'X-Atlassian-Token';

test('should create X-Atlassian-Token: no-check header in requests', ({ expect }) => {
  const client = new BaseClient({
    host: 'http://localhost',
    noCheckAtlassianToken: true,
  });

  // @ts-expect-error Wrong typings
  const defaultHeaders: Record<string, string> = client.instance.defaults.headers;

  expect(defaultHeaders[XAtlassianToken]).toBe('no-check');

  const sendRequestStub = sinon.stub(client, 'sendRequest');

  // @ts-expect-error Wrong typings
  client.sendRequest({}, undefined); // TODO problem with never type

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.headers?.[XAtlassianToken]).toBe(undefined);
});

test('should not create X-Atlassian-Token: no-check header in requests case 1', ({ expect }) => {
  const client = new BaseClient({
    host: 'http://localhost',
    noCheckAtlassianToken: false,
  });
  // @ts-expect-error Wrong typings
  const defaultHeaders: Record<string, string> = client.instance.defaults.headers;

  expect(defaultHeaders[XAtlassianToken]).toBe(undefined);

  const sendRequestStub = sinon.stub(client, 'sendRequest');

  // @ts-expect-error Wrong typings
  client.sendRequest({}, undefined); // TODO problem with never type
  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.headers?.[XAtlassianToken]).toBe(undefined);
});

test('should create X-Atlassian-Token: no-check header in requests case 2', ({ expect }) => {
  const client = new BaseClient({
    host: 'http://localhost',
  });

  // @ts-expect-error Wrong typings
  const defaultHeaders: Record<string, string> = client.instance.defaults.headers;

  expect(defaultHeaders[XAtlassianToken]).toBe(undefined);

  const sendRequestStub = sinon.stub(client, 'sendRequest');

  // @ts-expect-error Wrong typings
  client.sendRequest({}, undefined); // TODO problem with never type

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.headers?.[XAtlassianToken]).toBe(undefined);
});

test('shouldn\'t display error message for correct host urls', () => {
  new BaseClient({
    host: 'http://localhost',
  });

  new BaseClient({ host: 'https://localhost/' });
});

test('should display error message for incorrect host url', ({ expect }) => {
  const errorMessage = 'Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?';

  expect(() => new BaseClient({ host: '' })).toThrowError(errorMessage);
  expect(() => new BaseClient({ host: 'localhost' })).toThrowError(errorMessage);
  expect(() => new BaseClient({ host: 'example.com' })).toThrowError(errorMessage);
});
