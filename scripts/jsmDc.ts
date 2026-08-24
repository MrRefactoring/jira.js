/**
 * Brings up the throwaway Jira Service Management Data Center instance the `jsm` live suites run against.
 *
 *   pnpm jsm-dc:up       # compose up, wait, run the wizard — idempotent, safe to re-run
 *   pnpm jsm-dc:status   # what state the instance is in
 *   pnpm jsm-dc:down     # stop it and delete both volumes
 *
 * A second rig rather than a mode of the first: `atlassian/jira-software` carries neither Service Management nor
 * Assets, and the two run side by side on different ports so a Data Center run does not cost a Service Management one.
 *
 * `docker/jsm-dc/timebomb-license.txt` is the licence the wizard is given. A Jira Software timebomb — the one beside
 * the Jira rig — is accepted and opens Assets in full; Service Desk answers 403 to every request under it and needs a
 * Service Management Data Center timebomb from my.atlassian.com/license/evaluation instead.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
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
