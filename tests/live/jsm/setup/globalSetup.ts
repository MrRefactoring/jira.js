import { resolve } from 'node:path';
import type { TestProject } from 'vitest/node';
import { jsmTestEnv } from './env';
import { recordServiceDeskLicence } from './licenceMarker';
import { refuseUnlessThrowaway } from './guard';
import { assets, serviceDesk } from './client';
import { createFixtures, type Cleanup, type Fixtures } from './fixtures';
import { flushRecordedCalls } from '../../setup/recordCalls';
import { createServiceDeskFixtures } from './serviceDeskFixtures';

declare module 'vitest' {
  interface ProvidedContext {
    jsmFixtures: Fixtures;
  }
}

async function isServiceDeskLicensed(): Promise<boolean> {
  const info = await serviceDesk().info.getInfo();
  if (typeof info.isLicensedForUse !== 'boolean') throw new Error('Service Desk info omitted its license status.');
  return info.isLicensedForUse;
}

const cleanup: Cleanup[] = [];

async function removeWhatWasCreated(): Promise<void> {
  const errors: unknown[] = [];
  while (cleanup.length > 0) {
    try {
      await cleanup.pop()!();
    } catch (error) {
      errors.push(error);
    }
  }
  if (errors.length > 0) throw new AggregateError(errors, 'Failed to remove live-test fixtures.');
}

export async function setup(project: TestProject): Promise<void> {
  refuseUnlessThrowaway();

  const { host } = jsmTestEnv();

  let state: string;

  try {
    const response = await fetch(`${host}/status`, { signal: AbortSignal.timeout(10_000) });

    if (!response.ok) throw new Error(`${host}/status answered ${response.status}`);

    state = ((await response.json()) as { state?: string }).state ?? 'UNKNOWN';
  } catch (error) {
    throw new Error(
      `No Jira Service Management instance is answering at ${host}: ` +
        `${error instanceof Error ? error.message : String(error)}\nStart one with: pnpm jsm-dc:up`,
    );
  }

  if (state !== 'RUNNING') {
    throw new Error(
      `The Jira Service Management instance at ${host} is in state ${state}, not RUNNING.\n` +
        'If it is still starting, wait; if it has never been set up, run: pnpm jsm-dc:up',
    );
  }

  const licensed = await isServiceDeskLicensed();

  recordServiceDeskLicence(resolve(import.meta.dirname, '..', '..', '..', '..'), licensed);

  if (!licensed) {
    console.warn(
      'Service Desk is not licensed on this instance, so its suites will stand down. Assets runs either way.\n' +
        'Put a Service Management Data Center timebomb in docker/jsm-dc/timebomb-license.txt to license it.\n' +
        'The licensed Service Desk scenarios require a service project and its template workflows.',
    );
  }

  let created: Fixtures;

  try {
    created = await createFixtures(assets(), licensed, cleanup);
    if (licensed) created.serviceDesk = await createServiceDeskFixtures(cleanup);
  } catch (error) {
    try {
      await removeWhatWasCreated();
    } catch (cleanupError) {
      throw new AggregateError([error, cleanupError], 'Preparing and removing live-test fixtures failed.');
    }

    throw error;
  }

  project.provide('jsmFixtures', created);

  flushRecordedCalls();
}

export async function teardown(): Promise<void> {
  await removeWhatWasCreated();
}
