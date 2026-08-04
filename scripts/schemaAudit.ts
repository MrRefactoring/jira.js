/**
 * Runs the schema audit and reports what the live API sends that the schemas do not describe.
 *
 * Two things can go wrong and they are not the same thing:
 *
 * - a test fails, which means the library is actually broken against the live API;
 * - drift is found, which means Atlassian's spec has fallen behind its own API.
 *
 * Both fail the run, but the summary keeps them apart — a red run for the second reason is a documentation debt, not
 * an outage, and reading it as one wastes the signal.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
import { spawnSync } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const findings = join(root, 'node_modules', '.cache', 'schema-audit.jsonl');

interface SchemaDrift {
  endpoint: string;
  path: string;
  keys: string[];
  types: Record<string, string>;
}

const reportOnly = process.argv.includes('--report-only');

mkdirSync(dirname(findings), { recursive: true });

if (!reportOnly) rmSync(findings, { force: true });

const run = reportOnly
  ? { status: 0 }
  : spawnSync('npx', ['vitest', 'run', '--config', 'vitest.config.audit.ts'], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, AUDIT_SCHEMAS_OUTPUT: findings },
  });

/**
 * Array indices carry no information here.
 *
 * `results.0.self` and `results.1.self` are one gap in one schema, and left as they are they would fill the report with
 * the same finding once per element the API happened to return.
 */
function normalize(path: string): string {
  return path.replace(/(^|\.)\d+(\.|$)/g, '$1[]$2');
}

/**
 * Collapses the resource identifiers the suite happened to create, so one gap in one route is not counted once per id.
 *
 * Jira names resources in several shapes, and each would otherwise read as its own endpoint:
 *   - issue and project keys — `PROJ-123`, and a bare `PROJ` is a route word, so only the `-number` form collapses;
 *   - account ids — the `557058:uuid` realm form and the 24-hex form;
 *   - UUIDs — sprints, boards and objects on the newer APIs;
 *   - numeric ids — issues, comments, worklogs.
 *
 * The pure-numeric run has to stay long: `/rest/api/3/` and `/rest/api/2/` carry the API version, not an identity, and
 * a threshold of four digits leaves them alone. The cost is that a short agile board or sprint id (one or two digits)
 * is not collapsed — harmless, since a test tenant holds only a handful and they repeat across runs rather than
 * fragmenting the report.
 */
function normalizeEndpoint(endpoint: string): string {
  return endpoint
    .split('/')
    .map(segment => {
      if (/^[A-Z][A-Z0-9]+-\d+$/.test(segment)) return '{key}';
      if (/^[0-9a-z]+:[0-9a-f-]{8,}$/i.test(segment)) return '{accountId}';
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) return '{uuid}';
      if (/^[0-9a-f]{24,}$/i.test(segment)) return '{accountId}';
      if (/^\d{4,}$/.test(segment)) return '{id}';

      return segment;
    })
    .join('/');
}

const byField = new Map<string, Set<string>>();
const typesByField = new Map<string, Set<string>>();

if (existsSync(findings)) {
  const lines = readFileSync(findings, 'utf8').trim();

  for (const line of lines ? lines.split('\n') : []) {
    const entry = JSON.parse(line) as SchemaDrift;

    for (const key of entry.keys) {
      const field = normalize(entry.path ? `${entry.path}.${key}` : key);

      if (!byField.has(field)) byField.set(field, new Set());

      byField.get(field)!.add(normalizeEndpoint(entry.endpoint));

      if (!typesByField.has(field)) typesByField.set(field, new Set());

      typesByField.get(field)!.add(entry.types?.[key] ?? 'unknown');
    }
  }
}

const ranked = [...byField.entries()].sort(
  (a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]),
);
const endpoints = new Set([...byField.values()].flatMap(set => [...set]));

const summary: string[] = ['## Schema audit', ''];

if (ranked.length === 0) {
  summary.push('No drift: every response matched the schema that describes it.');
} else {
  summary.push(
    `**${ranked.length} undocumented fields** across **${endpoints.size} endpoints**.`,
    '',
    'These are keys Jira sends that the schemas do not describe. Usually not breakage —',
    'the published spec has fallen behind the API — but each one is a field consumers cannot see',
    'in the types.',
    '',
    '| Field | Type | Endpoints | Seen at |',
    '| --- | --- | ---: | --- |',
  );

  for (const [field, seen] of ranked) {
    const sample = [...seen].sort().slice(0, 3).join('<br>');
    const more = seen.size > 3 ? `<br>…and ${seen.size - 3} more` : '';

    const types = [...(typesByField.get(field) ?? new Set(['unknown']))].sort().join(' | ');

    summary.push(`| \`${field}\` | \`${types}\` | ${seen.size} | ${sample}${more} |`);
  }
}

const report = `${summary.join('\n')}\n`;

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, report, 'utf8');
} else {
  console.log(`\n${report}`);
}

if (run.status !== 0) {
  console.error('\nThe audit suite itself failed — that is real breakage, not drift. See the run output above.');
  process.exit(run.status ?? 1);
}

if (ranked.length > 0) {
  console.error(`\nSchema audit: ${ranked.length} undocumented fields across ${endpoints.size} endpoints.`);
  process.exit(1);
}

console.log('\nSchema audit: no drift.');
