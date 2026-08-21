/**
 * Runs a live suite and reports which of the shipped endpoints it actually called.
 *
 * A crawl proves the readable half of a surface against a real instance; nothing proves the other half was reached at
 * all. This closes that: the suites record every request they send, and this matches those requests back against the
 * endpoints the library ships, read out of the generated source the same way a crawl reads them.
 *
 * It fails when an endpoint is neither called nor named in the surface's `uncovered.ts`. A regenerated surface
 * therefore cannot gain an operation that no one ever calls, and dropping coverage costs a written reason.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';

export interface Uncovered {
  /** `METHOD /path` exactly as the generated function spells it, placeholders and all. */
  endpoint: string;
  reason: string;
}

export interface CoverageRun {
  /** What the surface is called in the report, e.g. `Server` or `Service Management`. */
  label: string;
  repoRoot: string;
  /** The generated `api` directories the endpoints are read from — more than one when a run covers two surfaces. */
  apiDirs: string[];
  vitestConfig: string;
  /** Where the recorded calls are written, relative to `node_modules/.cache`. */
  recordFile: string;
  uncovered: Uncovered[];
  /** The prefix the generated URLs carry that `uncovered.ts` leaves off, e.g. `/rest`. */
  urlPrefix: string;
}

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
 * The same trick a crawl uses, for the same reason: each generated function writes its method and URL as literals, so
 * the inventory cannot fall out of step with what is published.
 */
function readInventory(apiDirs: string[]): Endpoint[] {
  const endpoints: Endpoint[] = [];
  const pattern = /export async function ([A-Za-z0-9_]+)[\s\S]*?url: [`'"]([^`'"]+)[`'"],\s*\n\s*method: '([A-Z]+)'/g;

  for (const directory of apiDirs) {
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
  }

  return endpoints;
}

/** The endpoint a recorded request belongs to: the most literal template that matches it. */
function attribute(endpoints: Endpoint[], method: string, path: string): Endpoint | undefined {
  return endpoints
    .filter(endpoint => endpoint.method === method && endpoint.match.test(path))
    .sort((left, right) => left.placeholders - right.placeholders)[0];
}

export function reportLiveCoverage(run: CoverageRun): void {
  const recorded = join(run.repoRoot, 'node_modules', '.cache', run.recordFile);

  mkdirSync(dirname(recorded), { recursive: true });
  rmSync(recorded, { force: true });

  const suites = spawnSync('npx', ['vitest', 'run', '--config', run.vitestConfig], {
    cwd: run.repoRoot,
    stdio: 'inherit',
    env: { ...process.env, LIVE_COVERAGE_OUTPUT: recorded },
  });

  const endpoints = readInventory(run.apiDirs);
  const called = new Set<string>();

  if (existsSync(recorded)) {
    for (const line of readFileSync(recorded, 'utf8').split('\n')) {
      const [method, path] = line.split(' ');

      if (!method || !path) continue;

      const endpoint = attribute(endpoints, method, path);

      if (endpoint) called.add(endpoint.name);
    }
  }

  /** How `uncovered.ts` spells an endpoint: the generated URL without its prefix, placeholders in braces. */
  const spell = (endpoint: Endpoint): string =>
    `${endpoint.method} ${endpoint.url.replace(run.urlPrefix, '').replace(/\$\{parameters\.([A-Za-z0-9_]+)\}/g, '{$1}')}`;

  const excused = new Map(run.uncovered.map(entry => [entry.endpoint, entry.reason]));
  const excusedNames = new Set<string>();

  for (const endpoint of endpoints) {
    if (excused.has(spell(endpoint))) excusedNames.add(endpoint.name);
  }

  const stale = [...excused.keys()].filter(entry => !endpoints.some(endpoint => spell(endpoint) === entry));
  const missing = endpoints.filter(endpoint => !called.has(endpoint.name) && !excusedNames.has(endpoint.name));
  const byModule = new Map<string, string[]>();

  for (const endpoint of missing) {
    const module = endpoint.url.replace(`${run.urlPrefix}/`, '').split('/').slice(0, 3).join('/');

    byModule.set(module, [...(byModule.get(module) ?? []), `${endpoint.method} ${endpoint.name}`]);
  }

  // A union rather than a sum: an endpoint can be listed as unreachable and still be called, and counting it
  // twice would put the total above the number of endpoints that exist.
  const covered = new Set([...called, ...excusedNames]).size;

  console.log(
    `\n${run.label} coverage: ${called.size} of ${endpoints.length} endpoints called, `
      + `${excusedNames.size} listed as unreachable, ${missing.length} neither.`,
  );

  if (missing.length > 0) {
    console.error('\nNot called and not listed as unreachable:');

    for (const [module, names] of [...byModule].sort()) {
      console.error(`  ${module}\n    ${names.sort().join('\n    ')}`);
    }
  }

  if (stale.length > 0) {
    console.error(`\nListed as unreachable but no longer in the surface:\n  ${stale.join('\n  ')}`);
  }

  if (suites.status !== 0) {
    console.error('\nThe suites themselves failed. The coverage above is what was reached before they stopped.');
    process.exit(suites.status ?? 1);
  }

  if (missing.length > 0 || stale.length > 0) process.exit(1);

  console.log(`Every one of the ${covered} endpoints is either exercised or accounted for.`);
}
