// Validates packed tarballs for all jira.js packages.
// Runs pnpm pack, inspects tarball contents, checks required files, reports sizes.
// Usage: node scripts/pack-validate.mjs [--output-dir <dir>]

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const DEFAULT_OUTPUT_DIR = join(ROOT, 'dist-pack');

const args = process.argv.slice(2);
const outputDirIdx = args.indexOf('--output-dir');
const OUTPUT_DIR = outputDirIdx !== -1 ? resolve(args[outputDirIdx + 1]) : DEFAULT_OUTPUT_DIR;

const PACKAGES = [
  {
    name: '@jira.js/base',
    dir: join(ROOT, 'packages/base'),
    requiredFiles: [
      'package/package.json',
      'package/dist/index.js',
      'package/dist/index.cjs',
      'package/dist/index.d.ts',
    ],
    maxSizeKb: 500,
  },
  {
    name: '@jira.js/cloud',
    dir: join(ROOT, 'packages/cloud'),
    requiredFiles: [
      'package/package.json',
      'package/dist/index.js',
      'package/dist/index.cjs',
      'package/dist/index.d.ts',
    ],
    maxSizeKb: 8000,
  },
  {
    name: '@jira.js/agile',
    dir: join(ROOT, 'packages/agile'),
    requiredFiles: [
      'package/package.json',
      'package/dist/index.js',
      'package/dist/index.cjs',
      'package/dist/index.d.ts',
    ],
    maxSizeKb: 1000,
  },
];

function run(cmd, cwd) {
  return execSync(cmd, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function listTarballContents(tgzPath) {
  const output = run(`tar -tzf "${tgzPath}"`);
  return output.split('\n').filter(Boolean);
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function findTarball(dir) {
  const files = readdirSync(dir).filter(f => f.endsWith('.tgz'));
  if (files.length === 0) throw new Error(`No .tgz found in ${dir}`);
  if (files.length > 1) throw new Error(`Multiple .tgz found in ${dir}: ${files.join(', ')}`);
  return join(dir, files[0]);
}

async function validatePackage(pkg) {
  const errors = [];
  const warnings = [];

  console.log(`\n  📦 ${pkg.name}`);
  console.log(`     Packing...`);

  // Clean any stale tarballs first
  const staleTarballs = readdirSync(pkg.dir).filter(f => f.endsWith('.tgz'));
  for (const f of staleTarballs) rmSync(join(pkg.dir, f));

  // Pack
  run('pnpm pack', pkg.dir);
  const tgzPath = findTarball(pkg.dir);
  const tgzName = basename(tgzPath);
  const sizeBytes = statSync(tgzPath).size;
  const sizeKb = sizeBytes / 1024;

  // Move to output dir
  const destPath = join(OUTPUT_DIR, tgzName);
  run(`cp "${tgzPath}" "${destPath}"`);
  rmSync(tgzPath); // clean from package dir

  console.log(`     → ${tgzName} (${formatBytes(sizeBytes)})`);

  // Size check
  if (sizeKb > pkg.maxSizeKb) {
    errors.push(`Size ${formatBytes(sizeBytes)} exceeds max ${pkg.maxSizeKb} KB`);
  }

  // List tarball contents
  const contents = listTarballContents(destPath);
  console.log(`     ${contents.length} files in tarball`);

  // Check required files
  for (const required of pkg.requiredFiles) {
    const found = contents.some(f => f === required || f.startsWith(required + '/'));
    if (!found) {
      errors.push(`Required file missing from tarball: ${required}`);
    }
  }

  // Validate exports map — every path in exports must be in the tarball
  try {
    const pkgJsonPath = join(pkg.dir, 'package.json');
    const { default: pkgJson } = await import(pkgJsonPath, { with: { type: 'json' } });
    const exportErrors = validateExportsInTarball(pkgJson.exports, contents, pkg.name);
    errors.push(...exportErrors);
  } catch {
    warnings.push('Could not validate exports map paths in tarball');
  }

  // Check for leaked source files
  const srcLeaks = contents.filter(f => f.startsWith('package/src/'));
  if (srcLeaks.length > 0) {
    warnings.push(`Source files leaked into tarball: ${srcLeaks.slice(0, 3).join(', ')}${srcLeaks.length > 3 ? ` (+ ${srcLeaks.length - 3} more)` : ''}`);
  }

  // Check for leaked test files
  const testLeaks = contents.filter(f => f.startsWith('package/tests/') || f.startsWith('package/test/'));
  if (testLeaks.length > 0) {
    warnings.push(`Test files leaked into tarball: ${testLeaks[0]}`);
  }

  return { tgzPath: destPath, tgzName, sizeBytes, errors, warnings, contents };
}

function validateExportsInTarball(exportsMap, tarballContents, pkgName) {
  if (!exportsMap || typeof exportsMap !== 'object') return [];

  const errors = [];

  function walk(value, keyPath) {
    if (typeof value === 'string') {
      if (!value.startsWith('./')) return;
      const filePath = 'package/' + value.replace(/^\.\//, '');
      const found = tarballContents.some(f => f === filePath);
      if (!found) {
        errors.push(`exports["${keyPath}"] = "${value}" not found in tarball as ${filePath}`);
      }
      return;
    }
    if (typeof value === 'object' && value !== null) {
      for (const [k, v] of Object.entries(value)) {
        walk(v, keyPath ? `${keyPath}"]["${k}` : k);
      }
    }
  }

  walk(exportsMap, '');
  return errors;
}

async function main() {
  console.log('🗜️  Pack Validation — jira.js\n');

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  // Clean stale tarballs in output dir
  const stale = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.tgz'));
  for (const f of stale) rmSync(join(OUTPUT_DIR, f));

  const results = [];
  let overallPass = true;

  for (const pkg of PACKAGES) {
    try {
      const result = await validatePackage(pkg);
      results.push({ pkg: pkg.name, ...result });

      if (result.errors.length > 0) {
        overallPass = false;
        for (const err of result.errors) console.log(`     ❌ ${err}`);
      } else {
        console.log(`     ✅ all required files present`);
      }

      for (const warn of result.warnings) {
        console.log(`     ⚠️  ${warn}`);
      }
    } catch (err) {
      overallPass = false;
      results.push({ pkg: pkg.name, errors: [err.message], warnings: [] });
      console.log(`\n  ❌ ${pkg.name}: ${err.message}`);
    }
  }

  console.log('\n' + '─'.repeat(56));
  console.log(`  Output directory: ${OUTPUT_DIR}`);

  // Summary table
  console.log('\n  Package                  Size        Status');
  console.log('  ' + '─'.repeat(52));
  for (const r of results) {
    const sizeStr = r.sizeBytes ? formatBytes(r.sizeBytes) : 'N/A';
    const status = r.errors?.length > 0 ? '❌ FAIL' : '✅ PASS';
    console.log(`  ${r.pkg.padEnd(26)} ${sizeStr.padEnd(12)} ${status}`);
  }

  if (overallPass) {
    console.log('\n  ✅ Pack validation passed\n');
  } else {
    console.log('\n  ❌ Pack validation FAILED\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
