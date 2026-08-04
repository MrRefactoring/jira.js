/**
 * Prepares the tenant for the live suites, and sweeps up after them.
 *
 * Two jobs, and they fail in opposite directions on purpose.
 *
 * The first is the project-role fixture. Suites assume the test account sits in the test project's `Administrators`
 * role — that membership is what grants them the project itself, and Jira reports its absence as a 404 on the project
 * rather than a 403, so losing it reads like the project was deleted and every dependent suite fails for a reason
 * that names the wrong cause. Rather than assume the membership, this restores it, and fails loudly if it cannot.
 *
 * The second is the sweep of marker-tagged issues a crashed — or under-permissioned — run left behind. It runs once
 * before the suites and once after. Every fixture issue carries the `jjs` marker in its summary, so the sweep can
 * recognise its own debris without touching anything a person created in the same project.
 *
 * The sweep is best-effort by design: deleting an issue needs the *Delete Issues* project permission, and a token
 * without it must not turn cleanup into a failing test run. What it does instead is report how much it could not
 * remove, so the leak is visible rather than silent.
 */
import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { createClient, type Client } from '#/core';
import { createCloudClient, type CloudClient } from '#/cloud/createCloudClient';
import { hasLiveEnv, requireLiveEnv } from './env';
import { TEST_PROJECT_KEY } from './fixtures';
import { RESOURCE_MARKER } from '../helpers/naming';

/** Issues older than this are debris; anything newer may belong to a run happening right now. */
const MIN_AGE_MINUTES = 30;

/** The role whose membership grants the suites their access to the test project. */
const ACCESS_ROLE = 'Administrators';

/**
 * globalSetup runs outside the environment the `test.env` option builds, so the credentials the suites take for
 * granted are simply absent here. Loading the repo-root `.env` directly is what makes the sweep run at all — without
 * it `hasLiveEnv()` is false, `sweep` returns immediately, and the cleanup silently does nothing.
 */
function loadCredentialsIntoEnv(): void {
  Object.assign(process.env, loadEnv('test', resolve(import.meta.dirname, '../../..'), ''));
}

function connect(): CloudClient {
  const { host, email, apiToken } = requireLiveEnv();

  return createCloudClient(createClient({ host, auth: { type: 'basic', email, apiToken } }) as Client);
}

/**
 * Puts the test account back in the access role when something outside the suites has removed it.
 *
 * Unlike the sweep this is not best-effort: a run without the membership cannot pass, so a failure here should stop
 * the run with the real reason rather than let a cascade of misleading 404s report it.
 */
async function ensureAccessRole(): Promise<void> {
  loadCredentialsIntoEnv();

  if (!hasLiveEnv()) return;

  const client = connect();
  const accountId = (await client.myself.getCurrentUser()).accountId;

  if (!accountId) throw new Error('[live:setup] the credentials resolve to a user without an accountId');

  const roles = await client.projectRoles.getProjectRoles({ projectIdOrKey: TEST_PROJECT_KEY });
  const roleId = Number(/\/role\/(\d+)$/.exec(roles[ACCESS_ROLE])?.[1]);

  if (!Number.isFinite(roleId)) {
    throw new Error(`[live:setup] ${TEST_PROJECT_KEY} has no "${ACCESS_ROLE}" role to grant the suites access`);
  }

  const role = await client.projectRoles.getProjectRole({ projectIdOrKey: TEST_PROJECT_KEY, id: roleId });

  if (role.actors?.some(actor => actor.actorUser?.accountId === accountId)) return;

  await client.projectRoleActors.addActorUsers({ projectIdOrKey: TEST_PROJECT_KEY, id: roleId, user: [accountId] });

  console.log(`[live:setup] restored the test account in the "${ACCESS_ROLE}" role of ${TEST_PROJECT_KEY}`);
}

async function sweep(label: string): Promise<void> {
  loadCredentialsIntoEnv();

  if (!hasLiveEnv()) return;

  const client = connect();

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

  console.log(
    `[live:${label}] swept ${removed}/${issues.length} leftover issues`
      + (leaked > 0 ? ` — ${leaked} could not be deleted (grant "Delete Issues" to the test token)` : ''),
  );
}

export async function setup(): Promise<void> {
  await ensureAccessRole();
  await sweep('before');
}

export async function teardown(): Promise<void> {
  await sweep('after');
}
