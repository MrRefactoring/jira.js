/**
 * Runs the Data Center live suites and reports which of the shipped endpoints they actually called.
 *
 * The crawl proves the readable half against a real instance; nothing proved the other half was reached at all. This
 * closes that: the suites record every request they send, and this matches those requests back against the endpoints
 * the library ships, read out of `src/server/api` the same way the crawl reads them.
 *
 * It fails when an endpoint is neither called nor named in `tests/live/server/uncovered.ts`. A regenerated surface
 * therefore cannot gain an operation that no one ever calls, and dropping coverage costs a written reason.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { UNCOVERED } from '../tests/live/server/uncovered.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const recorded = join(root, 'node_modules', '.cache', 'server-coverage.txt');

interface Endpoint {
  name: string;
  method: string;
  /** The URL with its placeholders still in place, e.g. `/rest/api/2/issue/${parameters.issueIdOrKey}`. */
  url: string;
  match: RegExp;
  placeholders: number;
}

/**
 * Every endpoint the surface ships, read from the generated source.
 *
 * The same trick the crawl uses, for the same reason: each generated function writes its method and URL as literals,
 * so the inventory cannot fall out of step with what is published.
 */
function readInventory(): Endpoint[] {
  const directory = join(root, 'src', 'server', 'api');
  const endpoints: Endpoint[] = [];
  const pattern = /export async function ([A-Za-z0-9_]+)[\s\S]*?url: [`'"]([^`'"]+)[`'"],\s*\n\s*method: '([A-Z]+)'/g;

  for (const file of readdirSync(directory)) {
    if (file === 'index.ts') continue;

    const source = readFileSync(join(directory, file), 'utf8');

    for (const found of source.matchAll(pattern)) {
      const [, name, url, method] = found;
      const placeholders = [...url.matchAll(/\$\{parameters\.[A-Za-z0-9_]+\}/g)].length;
      const expression = url
        .replace(/[.*+?^${}()|[\]\\]/g, character => `\\${character}`)
        .replace(/\\\$\\\{parameters\\\.[A-Za-z0-9_]+\\\}/g, '[^/]+');

      endpoints.push({ name, method, url, placeholders, match: new RegExp(`^${expression}$`) });
    }
  }

  return endpoints;
}

/** The endpoint a recorded request belongs to: the most literal template that matches it. */
function attribute(endpoints: Endpoint[], method: string, path: string): Endpoint | undefined {
  return endpoints
    .filter(endpoint => endpoint.method === method && endpoint.match.test(path))
    .sort((left, right) => left.placeholders - right.placeholders)[0];
}

mkdirSync(dirname(recorded), { recursive: true });
rmSync(recorded, { force: true });

const run = spawnSync('npx', ['vitest', 'run', '--config', 'vitest.config.server.ts'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, SERVER_COVERAGE_OUTPUT: recorded },
});

const endpoints = readInventory();
const called = new Set<string>();

if (existsSync(recorded)) {
  for (const line of readFileSync(recorded, 'utf8').split('\n')) {
    const [method, path] = line.split(' ');

    if (!method || !path) continue;

    const endpoint = attribute(endpoints, method, path);

    if (endpoint) called.add(endpoint.name);
  }
}

/** Listed as unreachable, keyed the way the generated functions spell it: `METHOD /path` without the `/rest` prefix. */
const excused = new Map(UNCOVERED.map(entry => [entry.endpoint, entry.reason]));
const excusedNames = new Set<string>();

for (const endpoint of endpoints) {
  const spelt = `${endpoint.method} ${endpoint.url.replace('/rest', '').replace(/\$\{parameters\.([A-Za-z0-9_]+)\}/g, '{$1}')}`;

  if (excused.has(spelt)) excusedNames.add(endpoint.name);
}

const stale = [...excused.keys()].filter(
  entry => !endpoints.some(endpoint => {
    const spelt = `${endpoint.method} ${endpoint.url.replace('/rest', '').replace(/\$\{parameters\.([A-Za-z0-9_]+)\}/g, '{$1}')}`;

    return spelt === entry;
  }),
);

const missing = endpoints.filter(endpoint => !called.has(endpoint.name) && !excusedNames.has(endpoint.name));
const byModule = new Map<string, string[]>();

for (const endpoint of missing) {
  const module = endpoint.url.replace('/rest/', '').split('/').slice(0, 3).join('/');

  byModule.set(module, [...(byModule.get(module) ?? []), `${endpoint.method} ${endpoint.name}`]);
}

// A union rather than a sum: an endpoint can be listed as unreachable and still be called, and counting it
// twice would put the total above the number of endpoints that exist.
const covered = new Set([...called, ...excusedNames]).size;

console.log(
  `\nServer coverage: ${called.size} of ${endpoints.length} endpoints called, `
    + `${excusedNames.size} listed as unreachable, ${missing.length} neither.`,
);

if (missing.length > 0) {
  console.error('\nNot called and not listed in tests/live/server/uncovered.ts:');

  for (const [module, names] of [...byModule].sort()) {
    console.error(`  ${module}\n    ${names.sort().join('\n    ')}`);
  }
}

if (stale.length > 0) {
  console.error(`\nListed as unreachable but no longer in the surface:\n  ${stale.join('\n  ')}`);
}

if (run.status !== 0) {
  console.error('\nThe suites themselves failed. The coverage above is what was reached before they stopped.');
  process.exit(run.status ?? 1);
}

if (missing.length > 0 || stale.length > 0) process.exit(1);

console.log(`Every one of the ${covered} endpoints is either exercised or accounted for.`);
