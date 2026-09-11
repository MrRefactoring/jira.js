import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface Rig {
  product: string;
  composeDir: string;
  baseUrl: string;
  adminUsername: string;
  adminPassword: string;
  adminEmail: string;
  title: string;
}

const STARTUP_TIMEOUT_MS = Number(process.env.JIRA_DC_STARTUP_TIMEOUT_MS) || 25 * 60 * 1000;
const POLL_INTERVAL_MS = 5000;

function compose(rig: Rig, ...args: string[]): void {
  execFileSync('docker', ['compose', '-f', join(rig.composeDir, 'compose.yaml'), ...args], { stdio: 'inherit' });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

function readForm(html: string, pageUrl: string): Form {
  const form = /<form\b[^>]*\baction="([^"]+)"[^>]*>([\s\S]*?)<\/form>/i.exec(html);

  if (!form) throw new Error(`No form found on ${pageUrl}.`);

  const fields: Record<string, string> = {};

  for (const input of form[2].matchAll(/<input\b[^>]*>/gi)) {
    const tag = input[0];
    const name = /\bname="([^"]+)"/i.exec(tag);

    if (!name) continue;

    const type = /\btype="([^"]+)"/i.exec(tag)?.[1] ?? 'text';

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

async function isSetUp(rig: Rig): Promise<boolean> {
  return (await readState(rig)) === 'RUNNING';
}

function readLicense(rig: Rig): string {
  const path = join(rig.composeDir, 'timebomb-license.txt');

  if (!existsSync(path)) {
    throw new Error(
      `No licence at ${path}. It is deliberately not in the repository: take a three-hour timebomb licence from `
        + 'https://developer.atlassian.com/platform/marketplace/timebomb-licenses-for-testing-server-apps/ '
        + 'and save it there.',
    );
  }

  return readFileSync(path, 'utf8').trim();
}

async function runWizard(rig: Rig, license: string): Promise<void> {
  const session = createSession();

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

  const waitForFirstStep = async (): Promise<{ url: string; html: string }> => {
    const deadline = Date.now() + STARTUP_TIMEOUT_MS;
    let last = '';

    while (Date.now() < deadline) {
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

    page = await follow(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  }

  throw new Error('The setup wizard did not finish within twelve steps. Open the instance and look at what it asks.');
}

async function waitForRest(rig: Rig): Promise<void> {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;

  console.log('▸ waiting for the REST API');

  while (Date.now() < deadline) {
    const status = await fetch(`${rig.baseUrl}/rest/api/2/serverInfo`)
      .then(response => response.status)
      .catch(() => 0);

    if (status === 200 || status === 401) return;

    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error(
    `${rig.product} reached RUNNING but its REST API never answered within ${STARTUP_TIMEOUT_MS / 1000}s.`,
  );
}

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

  const license = readLicense(rig);

  console.log('▸ starting containers');
  compose(rig, 'up', '-d');

  console.log(`▸ waiting for ${rig.product} (a cold start takes tens of minutes)`);
  const state = await waitForState(rig, ['FIRST_RUN', 'RUNNING']);

  if (state === 'FIRST_RUN') {
    console.log('▸ running the setup wizard');
    await runWizard(rig, license);
    await waitForState(rig, ['RUNNING']);
  } else {
    console.log('▸ already set up');
  }

  await waitForRest(rig);

  console.log(`✔ ready at ${rig.baseUrl} — sign in as ${rig.adminUsername}, password from JIRA_SERVER_PASSWORD`);
}
