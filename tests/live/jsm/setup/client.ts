import { createClient, type Client } from '#/core';
import { createAssetsServerClient, type AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { createServiceDeskServerClient, type ServiceDeskServerClient } from '#/serviceDeskServer/createServiceDeskServerClient';
import { jsmTestEnv } from './env';

/**
 * The client both Service Management suites use: basic auth with a username, which is what a self-hosted Jira takes.
 *
 * `onSchemaMismatch: 'throw'` rather than the default warning, because a suite that prints a complaint and passes is
 * a suite nobody reads. The Data Center documents are wrong often enough that the difference matters: every mismatch
 * these suites meet is a generator fix waiting to be written, and a failing test is what makes it one.
 *
 * One client for both surfaces, as the library recommends — that they share it is the proof the sharing works.
 */
function connect(): Client {
  const { host, username, password } = jsmTestEnv();

  return createClient({ host, auth: { type: 'basic', username, password }, onSchemaMismatch: 'throw' });
}

export function assets(): AssetsServerClient {
  return createAssetsServerClient(connect());
}

export function serviceDesk(): ServiceDeskServerClient {
  return createServiceDeskServerClient(connect());
}
