/**
 * Brings up the throwaway Jira Data Center instance the `server` live suites run against.
 *
 * The container is deliberately not started by the test run. A cold Jira takes minutes to reach `RUNNING`, and the
 * licence it gets is a three-hour timebomb, so one instance has to serve many iterations of a suite rather than one
 * instance per iteration.
 *
 *   pnpm jira-dc:up       # compose up, wait, run the wizard, seed fixtures — idempotent, safe to re-run
 *   pnpm jira-dc:status   # what state the instance is in
 *   pnpm jira-dc:down     # stop it and delete both volumes
 *
 * Everything after the database is driven over HTTP because Atlassian's image has no environment variable for it: the
 * licence, the administrator and the mail step exist only as wizard forms. Rather than hard-code each form's fields,
 * the walk below reads the form the instance actually served — its action and its hidden inputs, `atl_token` among
 * them — and fills in only the values that step needs. A renamed hidden field then costs nothing.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const composeDir = join(root, 'docker', 'jira-dc');
const composeFile = join(composeDir, 'compose.yaml');

export const BASE_URL = process.env.JIRA_SERVER_BASE_URL ?? 'http://localhost:8080';
export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin123';
export const ADMIN_EMAIL = 'admin@example.invalid';
export const PROJECT_KEY = 'JJS';

/** How long to wait for a cold Jira to finish starting. It is genuinely this slow. */
const STARTUP_TIMEOUT_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 5000;

function compose(...args: string[]): void {
  execFileSync('docker', ['compose', '-f', composeFile, ...args], { stdio: 'inherit' });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Jira's own readiness endpoint.
 *
 * `FIRST_RUN` means it is up but has never been set up; `RUNNING` means the wizard is done. Anything else — including
 * a refused connection while Tomcat is still binding — counts as not ready yet.
 */
async function readState(): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/status`);

    if (!response.ok) return `HTTP ${response.status}`;

    const body = (await response.json()) as { state?: string };

    return body.state ?? 'UNKNOWN';
  } catch {
    return 'UNREACHABLE';
  }
}

async function waitForState(accepted: string[]): Promise<string> {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;
  let last = '';

  while (Date.now() < deadline) {
    const state = await readState();

    if (state !== last) {
      console.log(`  state: ${state}`);
      last = state;
    }

    if (accepted.includes(state)) return state;

    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error(`Jira did not reach ${accepted.join(' or ')} within ${STARTUP_TIMEOUT_MS / 1000}s (last: ${last}).`);
}

/** A cookie jar just large enough for one wizard walk — the session cookie is all Jira needs carried. */
function createSession(): { fetch: (url: string, init?: RequestInit) => Promise<Response> } {
  const jar = new Map<string, string>();

  const store = (response: Response): void => {
    for (const value of response.headers.getSetCookie()) {
      const [pair] = value.split(';');
      const index = pair.indexOf('=');

      if (index > 0) jar.set(pair.slice(0, index).trim(), pair.slice(index + 1).trim());
    }
  };

  return {
    async fetch(url: string, init: RequestInit = {}) {
      const cookie = [...jar].map(([name, value]) => `${name}=${value}`).join('; ');
      const response = await fetch(url, {
        ...init,
        redirect: 'manual',
        headers: { ...init.headers, ...(cookie ? { Cookie: cookie } : {}) },
      });

      store(response);

      return response;
    },
  };
}

interface Form {
  action: string;
  fields: Record<string, string>;
}

/**
 * The first form on the page, with every field it would submit.
 *
 * All of them, not just the hidden ones: Jira re-renders the step unchanged, with no error shown, when a field it
 * expects is absent — `nextStep` is an empty hidden input and leaving it out silently costs a step. The submit button
 * counts too; it carries `next=Next`, and the form does nothing without it.
 */
function readForm(html: string, pageUrl: string): Form {
  const form = /<form\b[^>]*\baction="([^"]+)"[^>]*>([\s\S]*?)<\/form>/i.exec(html);

  if (!form) throw new Error(`No form found on ${pageUrl}.`);

  const fields: Record<string, string> = {};

  for (const input of form[2].matchAll(/<input\b[^>]*>/gi)) {
    const tag = input[0];
    const name = /\bname="([^"]+)"/i.exec(tag);

    if (!name) continue;

    const type = /\btype="([^"]+)"/i.exec(tag)?.[1] ?? 'text';

    // An unchecked radio or checkbox submits nothing, and taking its value would pick the wrong option.
    if ((type === 'radio' || type === 'checkbox') && !/\bchecked\b/i.test(tag)) continue;

    fields[name[1]] = /\bvalue="([^"]*)"/i.exec(tag)?.[1] ?? '';
  }

  for (const button of form[2].matchAll(/<button\b[^>]*>/gi)) {
    const tag = button[0];
    const name = /\bname="([^"]+)"/i.exec(tag);

    if (!name || !/type="submit"/i.test(tag)) continue;

    fields[name[1]] = /\bvalue="([^"]*)"/i.exec(tag)?.[1] ?? '';
  }

  return { action: new URL(form[1], pageUrl).toString(), fields };
}

export async function isSetUp(): Promise<boolean> {
  return (await readState()) === 'RUNNING';
}

async function runWizard(): Promise<void> {
  const session = createSession();
  const license = readFileSync(join(composeDir, 'timebomb-license.txt'), 'utf8').trim();

  /**
   * What each wizard step needs beyond the fields the page already carries, keyed by the path the form posts to.
   *
   * Four steps, in this order: application properties, licence, administrator, mail. The database step is not among
   * them — that is what the `ATL_JDBC_*` and `ATL_DB_DRIVER` variables in the compose file buy.
   */
  const answers: Record<string, Record<string, string>> = {
    SetupApplicationProperties: { title: 'jira.js live', mode: 'private', baseURL: BASE_URL },
    SetupLicense: { setupLicenseKey: license },
    SetupAdminAccount: {
      username: ADMIN_USERNAME,
      fullname: 'jira.js live suite',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      confirm: ADMIN_PASSWORD,
    },
    SetupMailNotifications: { noemail: 'true' },
  };

  /** Follows redirects by hand — the session fetch is manual-redirect so cookies are recorded at every hop. */
  const follow = async (target: string, init?: RequestInit): Promise<{ url: string; html: string }> => {
    let url = target;
    let response = await session.fetch(url, init);

    for (let hop = 0; hop < 10 && response.status >= 300 && response.status < 400; hop += 1) {
      const location = response.headers.get('location');

      if (!location) break;

      url = new URL(location, url).toString();
      response = await session.fetch(url);
    }

    return { url, html: await response.text() };
  };

  /**
   * Waits for the wizard to actually be serving a step.
   *
   * `FIRST_RUN` arrives well before the first form does. For the minute or two it takes Jira to create its schema the
   * root serves `startup.jsp`, which has no form at all, and then the database step, which the `ATL_JDBC_*` variables
   * are about to make unnecessary. Both are stages of starting rather than questions, and posting to either is how a
   * run ends with "No form found".
   */
  const waitForFirstStep = async (): Promise<{ url: string; html: string }> => {
    const deadline = Date.now() + STARTUP_TIMEOUT_MS;
    let last = '';

    while (Date.now() < deadline) {
      // Start at the root and let Jira say which step it is on, rather than naming one: it redirects to whichever step
      // is outstanding, and asking for a step it considers done earns a redirect to the login page instead.
      const page = await follow(`${BASE_URL}/`);

      if (Object.keys(answers).some(step => page.url.includes(step))) return page;

      if (page.url !== last) {
        console.log(`  not asking yet: ${page.url.replace(BASE_URL, '')}`);
        last = page.url;
      }

      await sleep(POLL_INTERVAL_MS);
    }

    throw new Error(`The wizard never served a step within ${STARTUP_TIMEOUT_MS / 1000}s (last: ${last}).`);
  };

  let page = await waitForFirstStep();

  for (let step = 0; step < 12; step += 1) {
    if (await isSetUp()) return;

    const form = readForm(page.html, page.url);
    const answerKey = Object.keys(answers).find(key => form.action.includes(key));

    console.log(`  step: ${form.action.replace(BASE_URL, '')}`);

    const body = new URLSearchParams({ ...form.fields, ...(answerKey ? answers[answerKey] : {}) });

    // The reply to a step carries the next step's form in its body as often as it redirects to it, so what comes back
    // is used directly. Re-fetching the URL just posted to lands on a page with no form at all.
    page = await follow(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  }

  throw new Error('The setup wizard did not finish within twelve steps. Open the instance and look at what it asks.');
}

async function main(): Promise<void> {
  const command = process.argv[2] ?? 'status';

  if (command === 'down') {
    compose('down', '--volumes');
    console.log('✔ stopped, volumes removed');

    return;
  }

  if (command === 'status') {
    console.log(`${BASE_URL} → ${await readState()}`);

    return;
  }

  if (command !== 'up') {
    throw new Error(`Unknown command "${command}". Use up, status or down.`);
  }

  console.log('▸ starting containers');
  compose('up', '-d');

  console.log('▸ waiting for Jira (a cold start takes minutes)');
  const state = await waitForState(['FIRST_RUN', 'RUNNING']);

  if (state === 'FIRST_RUN') {
    console.log('▸ running the setup wizard');
    await runWizard();
    await waitForState(['RUNNING']);
  } else {
    console.log('▸ already set up');
  }

  console.log(`✔ ready at ${BASE_URL} — sign in as ${ADMIN_USERNAME} / ${ADMIN_PASSWORD}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
