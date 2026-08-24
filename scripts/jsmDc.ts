import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runRigCommand, type Rig } from './lib/dcRig.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const BASE_URL = process.env.JSM_SERVER_BASE_URL ?? 'http://localhost:8081';
export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin123';
export const ADMIN_EMAIL = 'admin@example.invalid';
export const PROJECT_KEY = 'JJSM';

const rig: Rig = {
  product: 'Jira Service Management',
  composeDir: join(root, 'docker', 'jsm-dc'),
  baseUrl: BASE_URL,
  adminUsername: ADMIN_USERNAME,
  adminPassword: ADMIN_PASSWORD,
  adminEmail: ADMIN_EMAIL,
  title: 'jira.js live jsm',
};

runRigCommand(rig, process.argv[2] ?? 'status').catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
