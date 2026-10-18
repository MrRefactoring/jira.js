import { createClient, type Client } from '#/core';
import { createAssetsServerClient, type AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import {
  createServiceDeskServerClient,
  type ServiceDeskServerClient,
} from '#/serviceDeskServer/createServiceDeskServerClient';
import { jsmTestEnv } from './env';
import { createServerClient, type ServerClient } from '#/server/createServerClient';

export function connect(): Client {
  const { host, username, password } = jsmTestEnv();

  return createClient({ host, auth: { type: 'basic', username, password }, onSchemaMismatch: 'throw' });
}

export function platform(): ServerClient {
  return createServerClient(connect());
}

export function assets(): AssetsServerClient {
  return createAssetsServerClient(connect());
}

export function serviceDesk(): ServiceDeskServerClient {
  return createServiceDeskServerClient(connect());
}
