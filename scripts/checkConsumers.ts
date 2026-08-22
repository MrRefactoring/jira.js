/**
 * Installs the packed tarball into a throwaway project and uses it the way a consumer would.
 *
 * Everything else in CI reads this repository's own tree, where the source resolves through `tsconfig` paths and the
 * `#/` alias. A consumer has neither. The failures that class produces have all shipped before:
 *
 * - a subpath that resolves here and 404s from `node_modules` (#403);
 * - an `exports` map that answers for `import` but not for a type resolver, so every consumer's `tsc` fails while the
 *   runtime is fine (#381, #383);
 * - a stray `package.json` inside `src/`, which redefines `#/` for the files under it and breaks the source
 *   navigation that shipping `src/` exists to provide — invisible to a build that resolves the alias through
 *   `tsconfig` instead.
 *
 * Both type resolvers are exercised, because they disagree: `bundler` reads `exports` loosely, `nodenext` enforces
 * extensions and the ESM/CJS split.
 *
 * Runs on bare `node`; keep the types erasable.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

if (!existsSync(join(root, 'dist'))) {
  console.error('[consumers] dist/ is missing. Run `pnpm run build` first.');
  process.exit(1);
}

const problems: string[] = [];
const workspace = mkdtempSync(join(tmpdir(), 'jira-js-consumer-'));

function run(command: string, args: string[], cwd: string): string {
  return execFileSync(command, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

try {
  const packOutput = run('npm', ['pack', '--pack-destination', workspace, '--silent'], root);
  const tarball = join(workspace, packOutput.trim().split('\n').at(-1) as string);

  const packed = run('tar', ['tzf', tarball], workspace)
    .split('\n')
    .map(entry => entry.replace(/^package\//, ''));

  const nestedManifests = packed.filter(entry => /^src\/.+\/package\.json$/.test(entry));

  if (nestedManifests.length > 0) {
    problems.push(
      `the tarball carries a package.json inside src/ (${nestedManifests.join(', ')}). ` +
        'It overrides the root `imports` map for every file beneath it, so `#/` stops pointing at src/.',
    );
  }

  writeFileSync(
    join(workspace, 'package.json'),
    `${JSON.stringify({ name: 'consumer', private: true, type: 'module', version: '0.0.0' }, null, 2)}\n`,
  );

  run('npm', ['install', '--no-audit', '--no-fund', '--silent', tarball], workspace);

  // Read off the manifest rather than listed here, so a new surface is covered by adding its export and nothing else.
  const SUBPATHS = Object.keys(JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).exports)
    .filter(entry => entry !== './browser' && entry !== './package.json')
    .map(entry => (entry === '.' ? 'jira.js' : `jira.js/${entry.slice(2)}`));

  // `jira.js/webhooks` describes what Jira posts to a server of yours; there is nothing to call, so it compiles to
  // `export {}`. An empty namespace is the right answer there, and a populated one would mean runtime code crept in.
  const TYPES_ONLY = ['jira.js/webhooks'];

  const runtimeProbe = [
    ...SUBPATHS.map((subpath, index) => `import * as m${index} from '${subpath}';`),
    `const surfaces = [${SUBPATHS.map((_, index) => `m${index}`).join(', ')}];`,
    `const names = ${JSON.stringify(SUBPATHS)};`,
    `const typesOnly = ${JSON.stringify(TYPES_ONLY)};`,
    'surfaces.forEach((surface, index) => {',
    '  const empty = Object.keys(surface).length === 0;',
    '  if (empty && !typesOnly.includes(names[index])) {',
    "    console.error(`empty namespace from ${names[index]}`);",
    '    process.exitCode = 1;',
    '  }',
    '  if (!empty && typesOnly.includes(names[index])) {',
    "    console.error(`${names[index]} is types only but exports runtime values`);",
    '    process.exitCode = 1;',
    '  }',
    '});',
    "if (typeof m0.createCloudClient !== 'function') {",
    "  console.error('createCloudClient is not a function on the root export');",
    '  process.exitCode = 1;',
    '}',
  ].join('\n');

  writeFileSync(join(workspace, 'probe.mjs'), `${runtimeProbe}\n`);

  try {
    run('node', ['probe.mjs'], workspace);
  } catch (error) {
    problems.push(`the package does not import from a consumer project:\n${(error as Error).message}`);
  }

  const typeProbe = [
    "import { createCloudClient, isNotFoundError } from 'jira.js';",
    "import { createClient } from 'jira.js/core';",
    "import type { Client } from 'jira.js/core';",
    "import type { WebhookHeaders, WebhookPayload } from 'jira.js/webhooks';",
    '',
    "const client: Client = createClient({ host: 'https://example.atlassian.net' });",
    'export const jira = createCloudClient(client);',
    'export const predicate: (value: unknown) => boolean = isNotFoundError;',
    'export const identify = (headers: WebhookHeaders, payload: WebhookPayload): string =>',
    "  `${payload.webhookEvent} ${headers['x-atlassian-webhook-identifier']}`;",
  ].join('\n');

  writeFileSync(join(workspace, 'probe.ts'), `${typeProbe}\n`);

  for (const moduleResolution of ['bundler', 'nodenext'] as const) {
    const module = moduleResolution === 'nodenext' ? 'nodenext' : 'esnext';

    writeFileSync(
      join(workspace, `tsconfig.${moduleResolution}.json`),
      `${JSON.stringify(
        {
          compilerOptions: { module, moduleResolution, noEmit: true, skipLibCheck: true, strict: true, target: 'es2022' },
          files: ['probe.ts'],
        },
        null,
        2,
      )}\n`,
    );

    try {
      run('node', [join(root, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', `tsconfig.${moduleResolution}.json`], workspace);
    } catch (error) {
      const output = ((error as { stdout?: string }).stdout ?? (error as Error).message).trim();

      problems.push(`types do not resolve under moduleResolution "${moduleResolution}":\n${output}`);
    }
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}

if (problems.length > 0) {
  console.error(`[consumers] ${problems.length} problem(s):\n`);
  problems.forEach(problem => console.error(`  - ${problem}\n`));
  process.exit(1);
}

console.log('[consumers] the packed tarball installs, imports and type-checks from a clean project.');
