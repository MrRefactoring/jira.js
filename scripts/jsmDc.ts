import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runRigCommand, type Rig } from './lib/dcRig.ts';
import { jsmTestEnv } from '../tests/live/jsm/setup/env.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const { host, username, password } = jsmTestEnv();

const rig: Rig = {
  product: 'Jira Service Management',
  composeDir: join(root, 'docker', 'jsm-dc'),
  baseUrl: host,
  adminUsername: username,
  adminPassword: password,
  adminEmail: process.env.JSM_SERVER_ADMIN_EMAIL?.trim() || 'admin@example.invalid',
  title: 'jira.js live jsm',
};

runRigCommand(rig, process.argv[2] ?? 'status').catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
