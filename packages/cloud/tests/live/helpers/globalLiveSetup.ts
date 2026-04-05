import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import type { TestProject } from 'vitest/node';
import { z } from 'zod';
import { createCloudClient } from '@jira.js/cloud';
import { createLiveBaseClient } from './liveBaseClient';
import { getLiveEnv } from './liveEnv';
import type { LiveProjectHandle } from './liveTestState';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../..');

function hydrateEnvFromDotfiles(): void {
  const fileEnv = loadEnv('', repoRoot, '');
  for (const [key, value] of Object.entries(fileEnv)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

const MyselfSchema = z.object({ accountId: z.string() });

function randomProjectKey(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const bytes = new Uint8Array(5);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => letters[byte % 26]!).join('');
}

function extractCliFilters(): string[] {
  const argv = process.argv.slice(2);
  const filters: string[] = [];
  for (const arg of argv) {
    if (!arg || arg.startsWith('-')) continue;
    if (['run', 'watch', 'related', 'bench', 'list'].includes(arg)) continue;
    filters.push(arg);
  }
  return filters;
}

export default async function setup(project: TestProject): Promise<() => Promise<void>> {
  const cliFilters = extractCliFilters();
  const { testFiles } = await project.globTestFiles(cliFilters);
  const willRunLiveTests = testFiles.some(file => file.includes('/tests/live/'));

  if (!willRunLiveTests) {
    project.provide('liveProject', null);
    return async () => {};
  }

  hydrateEnvFromDotfiles();
  const env = getLiveEnv();

  if (!env) {
    project.provide('liveProject', null);
    return async () => {};
  }

  const http = createLiveBaseClient(env);
  const cloud = createCloudClient({
    host: env.baseUrl,
    auth: { type: 'basic', email: env.email, apiToken: env.apiToken },
  });
  const startedAt = Date.now();

  const myself = await http.sendRequest({
    url: '/rest/api/3/myself',
    method: 'GET',
    schema: MyselfSchema,
  });

  const suffix = globalThis.crypto.randomUUID().slice(0, 8);
  const created = await cloud.projects.createProject({
    key: randomProjectKey(),
    name: `sdk-live-${env.runId}-${suffix}`,
    projectTypeKey: 'software',
    projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
    leadAccountId: myself.accountId,
  });

  const handle: LiveProjectHandle = {
    projectKey: created.key,
    projectId: String(created.id),
    accountId: myself.accountId,
  };

  project.provide('liveProject', handle);
  console.log(`[live-tests] provisioned project ${handle.projectKey} (runId=${env.runId}) in ${Date.now() - startedAt}ms`);

  return async () => {
    const teardownStartedAt = Date.now();
    try {
      await cloud.projects.deleteProject({ projectIdOrKey: handle.projectId });
      console.log(`[live-tests] destroyed project ${handle.projectKey} in ${Date.now() - teardownStartedAt}ms`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[live-tests] failed to destroy project ${handle.projectKey}: ${message}`);
    }
  };
}
