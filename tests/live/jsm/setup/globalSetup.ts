/**
 * Builds the instance the Service Management suites run against, and refuses to run when there is none.
 *
 * The container is thrown away after each run — the suites are allowed to leave it unusable — so this creates the
 * world from scratch rather than reconciling with what a previous run left. Starting the container is still a separate
 * step: a cold Jira takes minutes, and a test command that silently spends them reads as a hang.
 */
import type { TestProject } from 'vitest/node';
import { jsmTestEnv } from './env';
import { assets } from './client';
import { createFixtures, type Fixtures } from './fixtures';
import { flushRecordedCalls } from '../../setup/recordCalls';

declare module 'vitest' {
  interface ProvidedContext {
    jsmFixtures: Fixtures;
  }
}

/**
 * Whether Service Desk is licensed on this instance.
 *
 * Assets ships with the image and its REST module does not check for a seat, so a Jira Software timebomb opens
 * `/rest/assets/1.0` completely while every `/rest/servicedeskapi/` endpoint answers 403 with an HTML page. Asked here
 * once, so the Service Desk suites can stand down visibly instead of failing sixty times over a licence.
 */
async function isServiceDeskLicensed(host: string, username: string, password: string): Promise<boolean> {
  const response = await fetch(`${host}/rest/servicedeskapi/info`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) return false;

  return ((await response.json()) as { isLicensedForUse?: boolean }).isLicensedForUse === true;
}

export async function setup(project: TestProject): Promise<void> {
  const { host, username, password } = jsmTestEnv();

  let state: string;

  try {
    const response = await fetch(`${host}/status`);

    state = ((await response.json()) as { state?: string }).state ?? 'UNKNOWN';
  } catch {
    throw new Error(`No Jira Service Management instance is answering at ${host}.\nStart one with: pnpm jsm-dc:up`);
  }

  if (state !== 'RUNNING') {
    throw new Error(
      `The Jira Service Management instance at ${host} is in state ${state}, not RUNNING.\n`
        + 'If it is still starting, wait; if it has never been set up, run: pnpm jsm-dc:up',
    );
  }

  const licensed = await isServiceDeskLicensed(host, username, password);

  if (!licensed) {
    console.warn(
      'Service Desk is not licensed on this instance, so its suites will stand down. Assets runs either way.\n'
        + 'Put a Service Management Data Center timebomb in docker/jsm-dc/timebomb-license.txt to exercise both.',
    );
  }

  project.provide('jsmFixtures', await createFixtures(assets(), licensed));

  flushRecordedCalls();
}
