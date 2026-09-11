import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';

export interface Uncovered {
  endpoint: string;
  reason: string;
}

export interface CoverageRun {
  label: string;
  repoRoot: string;
  apiDirs: string[];
  vitestConfig: string;
  recordFile: string;
  uncovered: Uncovered[];
  urlPrefix: string;
}

interface Endpoint {
  name: string;
  method: string;
  url: string;
  match: RegExp;
  placeholders: number;
}

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

function attribute(endpoints: Endpoint[], method: string, path: string): Endpoint | undefined {
  return endpoints
    .filter(endpoint => endpoint.method === method && endpoint.match.test(path))
    .sort((left, right) => left.placeholders - right.placeholders)[0];
}

function runSuites(run: CoverageRun, recorded: string): number {
  mkdirSync(dirname(recorded), { recursive: true });
  rmSync(recorded, { force: true });

  const suites = spawnSync('npx', ['vitest', 'run', '--config', run.vitestConfig], {
    cwd: run.repoRoot,
    stdio: 'inherit',
    env: { ...process.env, LIVE_COVERAGE_OUTPUT: recorded },
  });

  if (suites.error) throw suites.error;

  return suites.status ?? 1;
}

function readCalled(recorded: string, endpoints: Endpoint[]): Set<string> {
  const called = new Set<string>();

  if (!existsSync(recorded)) return called;

  for (const line of readFileSync(recorded, 'utf8').split('\n')) {
    const [method, path] = line.split(' ');

    if (!method || !path) continue;

    const endpoint = attribute(endpoints, method, path);

    if (endpoint) called.add(endpoint.name);
  }

  return called;
}

interface Verdict {
  excusedNames: Set<string>;
  missing: Endpoint[];
  stale: string[];
  byModule: Map<string, string[]>;
  covered: number;
}

function judge(run: CoverageRun, endpoints: Endpoint[], called: Set<string>): Verdict {
  const spell = (endpoint: Endpoint): string =>
    `${endpoint.method} ${endpoint.url.replace(run.urlPrefix, '').replace(/\$\{parameters\.([A-Za-z0-9_]+)\}/g, '{$1}')}`;

  const excused = new Set(run.uncovered.map(entry => entry.endpoint));
  const excusedNames = new Set<string>();

  for (const endpoint of endpoints) {
    if (excused.has(spell(endpoint))) excusedNames.add(endpoint.name);
  }

  const stale = [...excused].filter(entry => !endpoints.some(endpoint => spell(endpoint) === entry));
  const missing = endpoints.filter(endpoint => !called.has(endpoint.name) && !excusedNames.has(endpoint.name));
  const byModule = new Map<string, string[]>();

  for (const endpoint of missing) {
    const module = endpoint.url.replace(`${run.urlPrefix}/`, '').split('/').slice(0, 3).join('/');

    byModule.set(module, [...(byModule.get(module) ?? []), `${endpoint.method} ${endpoint.name}`]);
  }

  const covered = new Set([...called, ...excusedNames]).size;

  return { excusedNames, missing, stale, byModule, covered };
}

export function reportLiveCoverage(run: CoverageRun): void {
  const recorded = join(run.repoRoot, 'node_modules', '.cache', run.recordFile);
  const status = runSuites(run, recorded);
  const endpoints = readInventory(run.apiDirs);
  const called = readCalled(recorded, endpoints);
  const { excusedNames, missing, stale, byModule, covered } = judge(run, endpoints, called);

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

  if (status !== 0) {
    console.error('\nThe suites themselves failed. The coverage above is what was reached before they stopped.');
    process.exit(status);
  }

  if (missing.length > 0 || stale.length > 0) process.exit(1);

  console.log(`Every one of the ${covered} endpoints is either exercised or accounted for.`);
}
