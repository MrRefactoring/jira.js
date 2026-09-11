import type { TestProject } from 'vitest/node';
import { ApiError } from '#/core';
import { serverTestEnv } from './env';
import { refuseUnlessThrowaway } from './guard';
import { connect } from './client';
import { createFixtures, type Fixtures } from './fixtures';
import { flushRecordedCalls } from '../../setup/recordCalls';

declare module 'vitest' {
  interface ProvidedContext {
    serverFixtures: Fixtures;
  }
}

async function ensureProject(): Promise<void> {
  const { projectKey, username } = serverTestEnv();
  const jira = connect();

  try {
    await jira.projects.getProject({ projectIdOrKey: projectKey });

    return;
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 404) throw error;
  }

  await jira.projects.createProject({
    key: projectKey,
    name: 'jira.js live',
    lead: username,
    projectTypeKey: 'software',
    projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-scrum-template',
  });
}

export async function setup(project: TestProject): Promise<void> {
  refuseUnlessThrowaway();

  const { host, projectKey, username } = serverTestEnv();

  let state: string;

  try {
    const response = await fetch(`${host}/status`, { signal: AbortSignal.timeout(10_000) });

    if (!response.ok) throw new Error(`${host}/status answered ${response.status}`);

    state = ((await response.json()) as { state?: string }).state ?? 'UNKNOWN';
  } catch (error) {
    throw new Error(
      `No usable Jira Data Center instance at ${host}: ${error instanceof Error ? error.message : String(error)}\n`
        + 'If nothing is running, start one with: pnpm jira-dc:up; if it is still starting, wait.',
    );
  }

  if (state !== 'RUNNING') {
    throw new Error(
      `The Jira Data Center instance at ${host} is in state ${state}, not RUNNING.\n`
        + 'If it is still starting, wait; if it has never been set up, run: pnpm jira-dc:up',
    );
  }

  await ensureProject();

  project.provide('serverFixtures', await createFixtures(connect(), projectKey, username));

  flushRecordedCalls();
}
