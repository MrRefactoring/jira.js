/**
 * The throwaway Data Center instance a live suite runs against, whichever product it is.
 *
 * It is parameterised by the image, the port and the licence, and by nothing else — the setup wizard is Jira's
 * whichever product runs behind it.
 *
 * The container is deliberately not started by the test run. A cold instance takes minutes to reach `RUNNING`, and the
 * licence it gets is a three-hour timebomb, so one instance has to serve many iterations of a suite rather than one
 * instance per iteration.
 *
 * Everything after the database is driven over HTTP because Atlassian's images have no environment variable for it:
 * the licence, the administrator and the mail step exist only as wizard forms. Rather than hard-code each form's
 * fields, the walk below reads the form the instance actually served — its action and its hidden inputs, `atl_token`
 * among them — and fills in only the values that step needs. A renamed hidden field then costs nothing.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface Rig {
  /** What the instance is called in this script's output. */
  product: string;
  /** The directory holding `compose.yaml` and `timebomb-license.txt`. */
  composeDir: string;
  baseUrl: string;
  adminUsername: string;
  adminPassword: string;
  adminEmail: string;
  /** The name the instance gives itself, which is what its own page titles show. */
  title: string;
}

/** How long to wait for a cold instance to finish starting. It is genuinely this slow. */
const STARTUP_TIMEOUT_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 5000;

function compose(rig: Rig, ...args: string[]): void {
  execFileSync('docker', ['compose', '-f', join(rig.composeDir, 'compose.yaml'), ...args], { stdio: 'inherit' });
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
async function readState(rig: Rig): Promise<string> {
  try {
    const response = await fetch(`${rig.baseUrl}/status`);

    if (!response.ok) return `HTTP ${response.status}`;

    const body = (await response.json()) as { state?: string };

    return body.state ?? 'UNKNOWN';
  } catch {
    return 'UNREACHABLE';
  }
}

async function waitForState(rig: Rig, accepted: string[]): Promise<string> {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;
  let last = '';

  while (Date.now() < deadline) {
    const state = await readState(rig);

    if (state !== last) {
      console.log(`  state: ${state}`);
      last = state;
    }

    if (accepted.includes(state)) return state;

    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error(
    `${rig.product} did not reach ${accepted.join(' or ')} within ${STARTUP_TIMEOUT_MS / 1000}s (last: ${last}).`,
  );
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

export async function isSetUp(rig: Rig): Promise<boolean> {
  return (await readState(rig)) === 'RUNNING';
}

async function runWizard(rig: Rig): Promise<void> {
  const session = createSession();
  const license = readFileSync(join(rig.composeDir, 'timebomb-license.txt'), 'utf8').trim();

  /**
   * What each wizard step needs beyond the fields the page already carries, keyed by the path the form posts to.
   *
   * Four steps, in this order: application properties, licence, administrator, mail. The database step is not among
   * them — that is what the `ATL_JDBC_*` and `ATL_DB_DRIVER` variables in the compose file buy. A step this does not
   * name is still submitted, carrying whatever the page already had on it, which is how a product that asks one more
   * question than Jira Software does gets past it.
   */
  const answers: Record<string, Record<string, string>> = {
    SetupApplicationProperties: { title: rig.title, mode: 'private', baseURL: rig.baseUrl },
    SetupLicense: { setupLicenseKey: license },
    SetupAdminAccount: {
      username: rig.adminUsername,
      fullname: 'jira.js live suite',
      email: rig.adminEmail,
      password: rig.adminPassword,
      confirm: rig.adminPassword,
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
      const page = await follow(`${rig.baseUrl}/`);

      if (Object.keys(answers).some(step => page.url.includes(step))) return page;

      if (page.url !== last) {
        console.log(`  not asking yet: ${page.url.replace(rig.baseUrl, '')}`);
        last = page.url;
      }

      await sleep(POLL_INTERVAL_MS);
    }

    throw new Error(`The wizard never served a step within ${STARTUP_TIMEOUT_MS / 1000}s (last: ${last}).`);
  };

  let page = await waitForFirstStep();

  for (let step = 0; step < 12; step += 1) {
    if (await isSetUp(rig)) return;

    const form = readForm(page.html, page.url);
    const answerKey = Object.keys(answers).find(key => form.action.includes(key));

    console.log(`  step: ${form.action.replace(rig.baseUrl, '')}`);

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

/** `up`, `status` or `down`, as the two rig scripts hand it over from `process.argv`. */
export async function runRigCommand(rig: Rig, command: string): Promise<void> {
  if (command === 'down') {
    compose(rig, 'down', '--volumes');
    console.log('✔ stopped, volumes removed');

    return;
  }

  if (command === 'status') {
    console.log(`${rig.baseUrl} → ${await readState(rig)}`);

    return;
  }

  if (command !== 'up') {
    throw new Error(`Unknown command "${command}". Use up, status or down.`);
  }

  console.log('▸ starting containers');
  compose(rig, 'up', '-d');

  console.log(`▸ waiting for ${rig.product} (a cold start takes minutes)`);
  const state = await waitForState(rig, ['FIRST_RUN', 'RUNNING']);

  if (state === 'FIRST_RUN') {
    console.log('▸ running the setup wizard');
    await runWizard(rig);
    await waitForState(rig, ['RUNNING']);
  } else {
    console.log('▸ already set up');
  }

  // The password is not printed. It is a fixed credential for a container that lives three hours and is then
  // deleted, so it is no secret — but a line that logs something read from `adminPassword` is one CodeQL flags on
  // every pull request afterwards, and the two scripts export the constant for a reader who wants it.
  console.log(`✔ ready at ${rig.baseUrl} — sign in as ${rig.adminUsername}, with the password its script exports`);
}
