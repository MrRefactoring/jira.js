#!/usr/bin/env node
/**
 * Validates that every path listed in each package's `exports` map (and the
 * legacy `main`/`module`/`types` fields) resolves to an existing file in dist/.
 *
 * Run after `pnpm build`:
 *   node scripts/check-exports.mjs
 *
 * Exit code 0 = all paths found. Non-zero = at least one missing file.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const PACKAGES = ['base', 'cloud', 'agile'];
const LEGACY_FIELDS = ['main', 'module', 'types'];

let passed = 0;
let failed = 0;

function check(pkgName, field, filePath, pkgDir) {
  const abs = resolve(pkgDir, filePath);
  if (existsSync(abs)) {
    console.log(`  ✅  ${field} → ${filePath}`);
    passed++;
  } else {
    console.error(`  ❌  ${field} → ${filePath}  [NOT FOUND]`);
    failed++;
  }
}

function walkExports(value, keyPath, pkgName, pkgDir) {
  if (typeof value === 'string') {
    // Skip non-file entries like './package.json' itself
    if (!value.startsWith('./') && !value.startsWith('../')) return;
    check(pkgName, keyPath, value, pkgDir);
    return;
  }
  if (typeof value === 'object' && value !== null) {
    for (const [k, v] of Object.entries(value)) {
      walkExports(v, `${keyPath}["${k}"]`, pkgName, pkgDir);
    }
  }
}

for (const pkg of PACKAGES) {
  const pkgDir = resolve(repoRoot, 'packages', pkg);
  const pkgJsonPath = resolve(pkgDir, 'package.json');

  if (!existsSync(pkgJsonPath)) {
    console.warn(`⚠️  packages/${pkg}/package.json not found — skipping`);
    continue;
  }

  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
  console.log(`\n📦  ${pkgJson.name}`);

  // Check legacy fields
  for (const field of LEGACY_FIELDS) {
    if (pkgJson[field]) {
      check(pkgJson.name, field, pkgJson[field], pkgDir);
    }
  }

  // Check exports map
  if (pkgJson.exports) {
    walkExports(pkgJson.exports, 'exports', pkgJson.name, pkgDir);
  }

  // Verify `files` list includes 'dist'
  if (pkgJson.files && !pkgJson.files.includes('dist')) {
    console.warn(`  ⚠️  "files" does not include "dist" — published package may be incomplete`);
  }
}

console.log(`\n${'─'.repeat(56)}`);
console.log(`Checked: ${passed + failed}  ✅ ${passed} passed  ❌ ${failed} failed`);

if (failed > 0) {
  console.error(`\nFailed: ${failed} export path(s) missing. Run "pnpm build" first.`);
  process.exit(1);
}

console.log('\n✅  All package exports validated.');
