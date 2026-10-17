import { createClient, type Client, type ClientConfig } from '#/core';
import { createServerClient, type ServerClient } from '#/server/createServerClient';
import { serverTestEnv } from './env';
import { createSession } from '../../../../scripts/lib/dcRig';

export function rawClient(onSchemaMismatch: ClientConfig['onSchemaMismatch']): Client {
  const { host, username, password } = serverTestEnv();

  return createClient({ host, auth: { type: 'basic', username, password }, onSchemaMismatch }) as Client;
}

export function connect(): ServerClient {
  return createServerClient(rawClient('throw'));
}

export async function connectWithSession(): Promise<ServerClient> {
  const { host, username, password } = serverTestEnv();
  const client = createClient({
    host,
    fetch: createSession().fetch,
    headers: { 'X-Atlassian-Token': 'no-check' },
    onSchemaMismatch: 'throw',
  });

  await client.sendRequest({
    url: '/rest/tsv/latest/authenticate',
    method: 'POST',
    body: { username, password },
  });

  return createServerClient(client);
}
