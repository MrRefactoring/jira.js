import { resolve } from 'node:path';
import type { TestProject } from 'vitest/node';
import { jsmTestEnv } from './env';
import { recordServiceDeskLicence } from './licenceMarker';
import { refuseUnlessThrowaway } from './guard';
import { assets } from './client';
import { createFixtures, type Cleanup, type Fixtures } from './fixtures';
import { flushRecordedCalls } from '../../setup/recordCalls';

declare module 'vitest' {
  interface ProvidedContext {
    jsmFixtures: Fixtures;
  }
}

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

const cleanup: Cleanup[] = [];

async function removeWhatWasCreated(): Promise<void> {
  while (cleanup.length > 0) await cleanup.pop()!().catch(() => {});
}

export async function setup(project: TestProject): Promise<void> {
  refuseUnlessThrowaway();

  const { host, username, password } = jsmTestEnv();

  let state: string;

  try {
    const response = await fetch(`${host}/status`, { signal: AbortSignal.timeout(10_000) });

    if (!response.ok) throw new Error(`${host}/status answered ${response.status}`);

    state = ((await response.json()) as { state?: string }).state ?? 'UNKNOWN';
  } catch (error) {
    throw new Error(
      `No Jira Service Management instance is answering at ${host}: `
        + `${error instanceof Error ? error.message : String(error)}\nStart one with: pnpm jsm-dc:up`,
    );
  }

  if (state !== 'RUNNING') {
    throw new Error(
      `The Jira Service Management instance at ${host} is in state ${state}, not RUNNING.\n`
        + 'If it is still starting, wait; if it has never been set up, run: pnpm jsm-dc:up',
    );
  }

  const licensed = await isServiceDeskLicensed(host, username, password);

  recordServiceDeskLicence(resolve(import.meta.dirname, '..', '..', '..', '..'), licensed);

  if (!licensed) {
    console.warn(
      'Service Desk is not licensed on this instance, so its suites will stand down. Assets runs either way.\n'
        + 'Put a Service Management Data Center timebomb in docker/jsm-dc/timebomb-license.txt to license it.\n'
        + 'The Service Desk suite is two tests so far; the rest of that surface is listed in tests/live/jsm/uncovered.ts.',
    );
  }

  let created: Fixtures;

  try {
    created = await createFixtures(assets(), licensed, cleanup);
  } catch (error) {
    await removeWhatWasCreated();

    throw error;
  }

  project.provide('jsmFixtures', created);

  flushRecordedCalls();
}

export async function teardown(): Promise<void> {
  await removeWhatWasCreated();
}
