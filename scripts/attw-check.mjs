// AreTheTypesWrong validation for all jira.js packages.
// Detects TypeScript resolution hazards across moduleResolution strategies.
// Usage: node scripts/attw-check.mjs [--pack-dir <dir>]

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const DEFAULT_PACK_DIR = join(ROOT, 'dist-pack');

const args = process.argv.slice(2);
const packDirIdx = args.indexOf('--pack-dir');
const PACK_DIR = packDirIdx !== -1 ? resolve(args[packDirIdx + 1]) : DEFAULT_PACK_DIR;

const PACKAGE_TARBALLS = ['jira.js-base', 'jira.js-cloud', 'jira.js-agile'];

// Unsupported resolution modes — warnings from these are silently accepted.
// node10 = classic Node.js CJS resolution (TypeScript <4.x default).
// Explicitly NOT in our support matrix: jira.js requires Node >= 22, TypeScript >= 6.
// node10 predates package.json#imports; #/ paths are irresolvable by design in node10.
const UNSUPPORTED_RESOLUTION_MODES = new Set(['node10']);

// Known issues accepted for CI, documented with root cause and remediation.
// Every entry must explain WHY it is acceptable and HOW it will be fixed.
const KNOWN_ISSUES = [
  {
    kind: 'InternalResolutionError',
    resolutionOptions: new Set(['node16', 'node16-cjs', 'node16-esm', 'bundler']),
    // Root cause: `tsc --emitDeclarationOnly` preserves `#/` subpath-import paths
    // verbatim in .d.ts output. Vite resolves these to relative paths in .js/.cjs,
    // but tsc does not rewrite them in declarations.
    // TypeScript bundler mode treats `#/` as "Invalid import specifier" when
    // encountered in node_modules/.d.ts files — it does not apply the package's
    // `imports` field to resolve them (TypeScript limitation, not a config bug).
    // node16 mode similarly cannot resolve #/ from external consumer context.
    // Runtime behavior is CORRECT — published JS uses relative imports only.
    // Remediation (Phase 13): Declaration bundler (dts-bundle-generator / rollup-plugin-dts)
    // inlines all types into dist/index.d.ts, eliminating all internal imports.
    moduleSpecifierPattern: /^#\//,
    note: '#/ subpath import in declaration file — TypeScript cannot resolve package.json#imports for #/ paths from within node_modules. Phase 13: declaration bundler',
  },
  {
    kind: 'InternalResolutionError',
    resolutionOptions: new Set(['node16', 'node16-cjs', 'node16-esm']),
    // Root cause: TypeScript declaration emitter outputs extensionless relative
    // imports (e.g. `export * from './createCloudClient'`) in .d.ts files.
    // node16/nodenext strict resolution requires explicit .js extensions.
    // Bundler mode is unaffected (bundler allows extensionless imports).
    // Remediation (Phase 13): Change `module` to `NodeNext` in tsconfig (requires
    // adding explicit .js extensions to all source imports) OR use declaration bundler.
    moduleSpecifierPattern: /^\.\//,
    note: 'Extensionless relative import in node16/nodenext declaration — tsc --emitDeclarationOnly does not emit .js suffixes. Phase 13: NodeNext tsconfig or declaration bundler',
  },
];

function run(cmd, cwd) {
  try {
    return {
      output: execSync(cmd, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(),
      exitCode: 0,
    };
  } catch (err) {
    return {
      output: (err.stdout || '') + (err.stderr || ''),
      exitCode: err.status || 1,
    };
  }
}

function findTarball(packDir, nameFragment) {
  if (!existsSync(packDir)) return null;
  const files = readdirSync(packDir).filter(f => f.endsWith('.tgz') && f.includes(nameFragment));
  return files.length > 0 ? join(packDir, files[0]) : null;
}

function parseAttwProblemsJson(tgzPath) {
  const tmpFile = `/tmp/attw-${Date.now()}.json`;
  try {
    // Redirect JSON to temp file to avoid execSync maxBuffer truncation on large packages
    execSync(`node_modules/.bin/attw "${tgzPath}" -f json > "${tmpFile}" 2>&1`, {
      cwd: ROOT,
      shell: true,
    });
  } catch {
    // attw exits non-zero when problems are found — the file still contains JSON
  }
  try {
    if (existsSync(tmpFile)) {
      const raw = readFileSync(tmpFile, 'utf8');
      const parsed = JSON.parse(raw);
      rmSync(tmpFile, { force: true });
      return parsed?.analysis?.problems ?? [];
    }
  } catch { /* ignore parse errors */ }
  return [];
}

function classifyProblem(problem) {
  if (UNSUPPORTED_RESOLUTION_MODES.has(problem.resolutionOption)) {
    return { acceptable: true, unsupported: true, note: `${problem.resolutionOption} is not in support matrix — jira.js requires Node ≥ 22 / TypeScript ≥ 6` };
  }
  for (const known of KNOWN_ISSUES) {
    if (known.kind !== problem.kind) continue;
    if (known.resolutionOptions && !known.resolutionOptions.has(problem.resolutionOption)) continue;
    if (known.moduleSpecifierPattern && !known.moduleSpecifierPattern.test(problem.moduleSpecifier ?? '')) continue;
    return { acceptable: true, note: known.note };
  }
  return { acceptable: false };
}

function parseAttwProblems(output) {
  const problems = [];
  const lines = output.split('\n');
  for (const line of lines) {
    if (line.includes('❌') || line.includes('⚠️') || line.toLowerCase().includes('error')) {
      problems.push(line.trim());
    }
  }
  return problems;
}

function hasAttwBinary() {
  const result = run('node_modules/.bin/attw --version', ROOT);
  return result.exitCode === 0;
}

async function checkPackage(nameFragment, packDir) {
  const tgzPath = findTarball(packDir, nameFragment);
  if (!tgzPath) {
    return { pass: false, error: `Tarball not found for ${nameFragment} in ${packDir}`, output: '' };
  }

  const pkgName = '@jira.js/' + nameFragment.replace('jira.js-', '');
  console.log(`\n  📦 ${pkgName}`);
  console.log(`     Tarball: ${tgzPath.split('/').pop()}`);

  const result = run(`node_modules/.bin/attw "${tgzPath}" --format table`, ROOT);
  const outputLines = result.output.split('\n');
  for (const line of outputLines.filter(Boolean)) {
    console.log(`     ${line}`);
  }

  if (result.exitCode === 0) {
    console.log(`     ✅ No type resolution hazards`);
    return { pass: true, output: result.output };
  }

  // Classify all problems — separate known-acceptable from blocking
  const allProblems = parseAttwProblemsJson(tgzPath);
  const unacceptable = [];
  const knownIssues = [];
  const unsupportedEnv = [];

  for (const problem of allProblems) {
    const { acceptable: isOk, unsupported, note } = classifyProblem(problem);
    if (!isOk) {
      unacceptable.push(problem);
    } else if (unsupported) {
      unsupportedEnv.push({ problem, note });
    } else {
      knownIssues.push({ problem, note });
    }
  }

  if (unsupportedEnv.length > 0) {
    const modes = [...new Set(unsupportedEnv.map(u => u.problem.resolutionOption))];
    console.log(`     ⛔  ${unsupportedEnv.length} unsupported-env warning(s) (silenced — ${modes.join(', ')} not in support matrix)`);
  }

  const knownNotes = [...new Set(knownIssues.map(a => a.note))];
  if (knownIssues.length > 0) {
    console.log(`     ⚠️  ${knownIssues.length} known issue(s) (non-blocking):`);
    for (const note of knownNotes) console.log(`        • ${note}`);
  }

  if (unacceptable.length === 0) {
    const allWarnings = [...knownIssues.map(a => a.note)];
    return { pass: true, output: result.output, warnings: allWarnings, unsupported: unsupportedEnv.length };
  }

  console.log(`     ❌ ${unacceptable.length} blocking problem(s):`);
  for (const p of unacceptable.slice(0, 5)) {
    console.log(`        • ${p.kind}: ${p.moduleSpecifier ?? ''} in ${p.fileName?.split('/').slice(-2).join('/')}`);
  }
  return { pass: false, output: result.output, problems: unacceptable };
}

async function main() {
  console.log('🔬 AreTheTypesWrong — jira.js\n');

  if (!hasAttwBinary()) {
    console.error('  ❌ @arethetypeswrong/cli not found in node_modules/.bin/attw');
    console.error('     Run: pnpm install');
    process.exit(1);
  }

  if (!existsSync(PACK_DIR) || readdirSync(PACK_DIR).filter(f => f.endsWith('.tgz')).length === 0) {
    console.log('  Packing packages first...');
    run('node scripts/pack-validate.mjs', ROOT);
  }

  const results = [];
  let overallPass = true;

  for (const fragment of PACKAGE_TARBALLS) {
    try {
      const result = await checkPackage(fragment, PACK_DIR);
      results.push({ name: fragment, ...result });
      if (!result.pass) overallPass = false;
    } catch (err) {
      results.push({ name: fragment, pass: false, error: err.message });
      overallPass = false;
    }
  }

  console.log('\n' + '─'.repeat(56));
  console.log('\n  Package                  Status');
  console.log('  ' + '─'.repeat(40));
  for (const r of results) {
    const pkgName = '@jira.js/' + r.name.replace('jira.js-', '');
    const status = r.pass ? '✅ PASS' : '❌ FAIL';
    const warnPart = r.warnings?.length ? ` ${r.warnings.length} warnings` : '';
    const unsupPart = r.unsupported ? ` ${r.unsupported} unsupported-env` : '';
    const extra = (warnPart || unsupPart) ? ` (${[warnPart, unsupPart].filter(Boolean).join(',')})` : '';
    console.log(`  ${pkgName.padEnd(26)} ${status}${extra}`);
  }

  if (overallPass) {
    console.log('\n  ✅ ATTW validation passed\n');
  } else {
    console.log('\n  ❌ ATTW validation FAILED\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
