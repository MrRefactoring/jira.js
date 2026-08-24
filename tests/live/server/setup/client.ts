import { createClient, type Client } from '#/core';
import { createServerClient, type ServerClient } from '#/server/createServerClient';
import { serverTestEnv } from './env';

/**
 * The client every Data Center suite uses: basic auth with a username, which is what a self-hosted Jira takes.
 *
 * `onSchemaMismatch: 'throw'` rather than the default warning, because a suite that prints a complaint and passes is
 * a suite nobody reads. The Data Center document is wrong often enough that the difference matters: every mismatch
 * these suites meet is a generator fix waiting to be written, and a failing test is what makes it one.
 */
export function connect(): ServerClient {
  const { host, username, password } = serverTestEnv();

  return createServerClient(
    createClient({ host, auth: { type: 'basic', username, password }, onSchemaMismatch: 'throw' }) as Client,
  );
}
