/**
 * Brings up the throwaway Jira Data Center instance the `server` live suites run against.
 *
 *   pnpm jira-dc:up       # compose up, wait, run the wizard — idempotent, safe to re-run
 *   pnpm jira-dc:status   # what state the instance is in
 *   pnpm jira-dc:down     # stop it and delete both volumes
 *
 * The walk itself is in scripts/lib/dcRig.ts, shared with the Service Management rig.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runRigCommand, type Rig } from './lib/dcRig.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const BASE_URL = process.env.JIRA_SERVER_BASE_URL ?? 'http://localhost:8080';
export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin123';
export const ADMIN_EMAIL = 'admin@example.invalid';
export const PROJECT_KEY = 'JJS';

const rig: Rig = {
  product: 'Jira',
  composeDir: join(root, 'docker', 'jira-dc'),
  baseUrl: BASE_URL,
  adminUsername: ADMIN_USERNAME,
  adminPassword: ADMIN_PASSWORD,
  adminEmail: ADMIN_EMAIL,
  title: 'jira.js live',
};

runRigCommand(rig, process.argv[2] ?? 'status').catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
