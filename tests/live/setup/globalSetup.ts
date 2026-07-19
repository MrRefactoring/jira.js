/**
 * Sweeps marker-tagged issues a crashed — or under-permissioned — run left behind.
 *
 * Runs once before the suites and once after. Every fixture issue carries the `jjs` marker in its summary, so the
 * sweep can recognise its own debris without touching anything a person created in the same project.
 *
 * The sweep is best-effort by design: deleting an issue needs the *Delete Issues* project permission, and a token
 * without it must not turn cleanup into a failing test run. What it does instead is report how much it could not
 * remove, so the leak is visible rather than silent.
 */
import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { createClient } from '#/core';
import { createCloudClient } from '#/cloud/createCloudClient';
import { hasLiveEnv, requireLiveEnv } from './env';
import { RESOURCE_MARKER } from '../helpers/naming';

/** Issues older than this are debris; anything newer may belong to a run happening right now. */
const MIN_AGE_MINUTES = 30;

/**
 * globalSetup runs outside the environment the `test.env` option builds, so the credentials the suites take for
 * granted are simply absent here. Loading the repo-root `.env` directly is what makes the sweep run at all — without
 * it `hasLiveEnv()` is false, `sweep` returns immediately, and the cleanup silently does nothing.
 */
function loadCredentialsIntoEnv(): void {
  Object.assign(process.env, loadEnv('test', resolve(import.meta.dirname, '../../..'), ''));
}

async function sweep(label: string): Promise<void> {
  loadCredentialsIntoEnv();

  if (!hasLiveEnv()) return;

  const { host, email, apiToken } = requireLiveEnv();
  const client = createCloudClient(createClient({ host, auth: { type: 'basic', email, apiToken } }));

  const jql = `summary ~ "${RESOURCE_MARKER}" AND created <= -${MIN_AGE_MINUTES}m ORDER BY created ASC`;

  const found = await client.issueSearch
    .searchAndReconsileIssuesUsingJql({ jql, maxResults: 100, fields: ['summary'] })
    .catch(() => undefined);

  const issues = found?.issues ?? [];

  if (issues.length === 0) return;

  let removed = 0;

  for (const issue of issues) {
    const deleted = await client.issues
      .deleteIssue({ issueIdOrKey: issue.id!, deleteSubtasks: 'true' })
      .then(() => true)
      .catch(() => false);

    if (deleted) removed++;
  }

  const leaked = issues.length - removed;

  // eslint-disable-next-line no-console
  console.log(
    `[live:${label}] swept ${removed}/${issues.length} leftover issues`
      + (leaked > 0 ? ` — ${leaked} could not be deleted (grant "Delete Issues" to the test token)` : ''),
  );
}

export async function setup(): Promise<void> {
  await sweep('before');
}

export async function teardown(): Promise<void> {
  await sweep('after');
}
