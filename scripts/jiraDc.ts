import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runRigCommand, type Rig } from './lib/dcRig.ts';
import { serverTestEnv } from '../tests/live/server/setup/env.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const { host, username, password } = serverTestEnv();

const rig: Rig = {
  product: 'Jira',
  composeDir: join(root, 'docker', 'jira-dc'),
  baseUrl: host,
  adminUsername: username,
  adminPassword: password,
  adminEmail: process.env.JIRA_SERVER_ADMIN_EMAIL?.trim() || 'admin@example.invalid',
  title: 'jira.js live',
};

runRigCommand(rig, process.argv[2] ?? 'status').catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
