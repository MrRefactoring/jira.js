/**
 * Builds the instance the Data Center suites run against, and refuses to run when there is none.
 *
 * The container is thrown away after each run — the suites are allowed to leave it unusable, and one of them ends by
 * putting Jira into read-only mode — so this creates the world from scratch rather than reconciling with what a
 * previous run left. Starting the container is still a separate step: a cold Jira takes minutes, and a test command
 * that silently spends them reads as a hang.
 */
import type { TestProject } from 'vitest/node';
import { ApiError } from '#/core';
import { serverTestEnv } from './env';
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
  const { host, projectKey } = serverTestEnv();

  let state: string;

  try {
    const response = await fetch(`${host}/status`);

    state = ((await response.json()) as { state?: string }).state ?? 'UNKNOWN';
  } catch {
    throw new Error(
      `No Jira Data Center instance is answering at ${host}.\nStart one with: pnpm jira-dc:up`,
    );
  }

  if (state !== 'RUNNING') {
    throw new Error(
      `The Jira Data Center instance at ${host} is in state ${state}, not RUNNING.\n`
        + 'If it is still starting, wait; if it has never been set up, run: pnpm jira-dc:up',
    );
  }

  await ensureProject();

  project.provide('serverFixtures', await createFixtures(connect(), projectKey));

  // The fixtures are a suite of their own as far as the ledger is concerned: sixteen write endpoints run here.
  flushRecordedCalls();
}
