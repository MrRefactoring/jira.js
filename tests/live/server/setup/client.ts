import { createClient, type Client, type ClientConfig } from '#/core';
import { createServerClient, type ServerClient } from '#/server/createServerClient';
import { serverTestEnv } from './env';

export function rawClient(onSchemaMismatch: ClientConfig['onSchemaMismatch']): Client {
  const { host, username, password } = serverTestEnv();

  return createClient({ host, auth: { type: 'basic', username, password }, onSchemaMismatch }) as Client;
}

export function connect(): ServerClient {
  return createServerClient(rawClient('throw'));
}
