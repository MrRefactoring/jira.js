/**
 * Proves the built package can run in a browser.
 *
 * Two failures have already shipped past review here, and each is cheap to catch mechanically:
 *
 * - a runtime reference to `process` or a `node:` import, which breaks the moment the bundle is loaded — `process` is
 *   the worse of the two, because bundlers shim it as an empty object and the crash is a TypeError deep inside a
 *   property read rather than a missing-module error;
 * - a Node type such as `Buffer` or `node:stream` leaking into the shipped declarations, which breaks `tsc` for every
 *   browser consumer that does not install `@types/node`.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/devVersion.ts.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

function walk(dir: string, ext: string): string[] {
  const found: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);

    if (entry.isDirectory()) found.push(...walk(full, ext));
    else if (entry.name.endsWith(ext)) found.push(full);
  }

  return found;
}

const problems: string[] = [];

const runtimeFiles = walk(dist, '.js').filter(file => !file.endsWith('browser.js'));

const RUNTIME_PATTERNS = [
  { label: 'a node: import', regex: /(?:from|import)\s*\(?\s*['"]node:/ },
  { label: 'a require() call', regex: /\brequire\s*\(/ },
  { label: 'a process reference', regex: /\bprocess\s*\./ },
  { label: 'a Buffer reference', regex: /\bBuffer\b/ },
];

/** Comments mention `Buffer` and `process` precisely because the code avoids them; only executable text counts. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, match => match.replace(/[^\n]/g, ' ')).replace(/\/\/[^\n]*/g, '');
}

for (const file of runtimeFiles) {
  const source = stripComments(readFileSync(file, 'utf8'));

  for (const { label, regex } of RUNTIME_PATTERNS) {
    const lines = source.split('\n');

    lines.forEach((line, index) => {
      if (regex.test(line)) {
        problems.push(`${relative(root, file)}:${index + 1} — ${label}: ${line.trim()}`);
      }
    });
  }
}

const probe = join(root, 'node_modules', '.cache', 'browser-safe');

rmSync(probe, { recursive: true, force: true });
mkdirSync(join(probe, 'src'), { recursive: true });

const entries = ['.', './core', './cloud', './agile', './serviceDesk'];
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

writeFileSync(
  join(probe, 'src', 'index.ts'),
  entries
    .map((entry, index) => {
      const target = entry === '.' ? pkg.exports['.'].types : pkg.exports[entry].types;

      return `import * as e${index} from '${join(root, target).replace(/\.d\.ts$/, '.js')}';\nvoid e${index};`;
    })
    .join('\n'),
);

writeFileSync(
  join(probe, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'bundler',
        lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        types: [],
        strict: true,
        noEmit: true,
        skipLibCheck: false,
      },
      include: ['src'],
    },
    null,
    2,
  ),
);

try {
  execFileSync(join(root, 'node_modules', '.bin', 'tsc'), ['--project', probe], {
    encoding: 'utf8',
    stdio: 'pipe',
  });
} catch (error) {
  const { stdout, stderr, message } = error as { stdout?: string; stderr?: string; message?: string };
  const output = `${stdout ?? ''}${stderr ?? ''}`.trim() || message || 'tsc failed without output';

  problems.push(`the shipped declarations need @types/node:\n${output}`);
}

rmSync(probe, { recursive: true, force: true });

if (problems.length > 0) {
  console.error(`✖ ${problems.length} browser-compatibility problem(s):\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  console.error('');
  process.exit(1);
}

console.log(`✔ browser-safe: ${runtimeFiles.length} runtime files clean, ${entries.length} entry points typecheck`);
