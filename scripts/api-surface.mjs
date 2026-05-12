#!/usr/bin/env node
// API surface snapshot tool for @jira.js packages.
//
// Extracts all exported names from each package's src/index.ts and compares
// against committed snapshot files at packages/<pkg>/api-surface.snap
//
// Commands:
//   node scripts/api-surface.mjs check   — compare current vs snapshot (default, used in CI)
//   node scripts/api-surface.mjs update  — regenerate snapshots from current source
//
// A snapshot failure means a public API export was added, removed, or renamed.
// All such changes must be explicit and code-reviewed.
//
// Snapshot format: sorted list of exported identifiers, one per line.
// Values and types are tracked separately so removals of either are visible.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

const PACKAGES = ['base', 'cloud', 'agile'];
const mode = process.argv[2] ?? 'check';

if (mode !== 'check' && mode !== 'update') {
  console.error('Usage: node scripts/api-surface.mjs [check|update]');
  process.exit(1);
}

/**
 * Extracts exported identifier names from a TypeScript index file.
 * Handles:
 *   export { A, B } from '...'
 *   export type { T, U } from '...'
 *   export * from '...'        → noted as "* from <module>"
 *   export function foo() {}
 *   export class Foo {}
 *   export const bar = ...
 *   export type Baz = ...
 *   export interface Qux {}
 */
function extractExports(src) {
  const values = new Set();
  const types = new Set();
  const stars = [];

  // export { A, type B, C } from '...'
  const namedRe = /^export\s+\{([^}]+)\}\s+from\s+['"][^'"]+['"]/gm;
  for (const m of src.matchAll(namedRe)) {
    const items = m[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const item of items) {
      if (item.startsWith('type ')) {
        types.add(item.replace(/^type\s+/, '').trim());
      } else {
        values.add(item.replace(/\s+as\s+\S+$/, '').trim());
      }
    }
  }

  // export type { A, B } from '...'
  const typeBlockRe = /^export\s+type\s+\{([^}]+)\}\s+from\s+['"][^'"]+['"]/gm;
  for (const m of src.matchAll(typeBlockRe)) {
    const items = m[1].split(',').map(s => s.trim()).filter(Boolean);
    for (const item of items) {
      types.add(item.replace(/^type\s+/, '').replace(/\s+as\s+\S+$/, '').trim());
    }
  }

  // export * from '...'
  const starRe = /^export\s+\*\s+from\s+['"]([^'"]+)['"]/gm;
  for (const m of src.matchAll(starRe)) {
    stars.push(m[1]);
  }

  // export function/class/const/type/interface name
  const declRe = /^export\s+(?:async\s+)?(?:function|class|const|let|var|type|interface|enum)\s+([A-Za-z_$][A-Za-z0-9_$]*)/gm;
  for (const m of src.matchAll(declRe)) {
    values.add(m[1]);
  }

  // export default ... (rare in this codebase but handle it)
  if (/^export\s+default\s+/m.test(src)) {
    values.add('default');
  }

  return { values: [...values].sort(), types: [...types].sort(), stars };
}

function generateSnapshot(pkgName, values, types, stars) {
  const lines = [
    `# ${pkgName} — public API surface snapshot`,
    `# DO NOT EDIT manually. Update via: node scripts/api-surface.mjs update`,
    `# To verify: node scripts/api-surface.mjs check`,
    ``,
  ];

  if (stars.length > 0) {
    lines.push('## Re-exports (export * from)');
    for (const s of stars.sort()) {
      lines.push(`  ${s}`);
    }
    lines.push('');
  }

  lines.push('## Values');
  for (const v of values) {
    lines.push(`  ${v}`);
  }
  lines.push('');

  lines.push('## Types');
  for (const t of types) {
    lines.push(`  ${t}`);
  }
  lines.push('');

  return lines.join('\n');
}

let allPassed = true;

for (const pkg of PACKAGES) {
  const pkgDir = resolve(repoRoot, 'packages', pkg);
  const indexPath = resolve(pkgDir, 'src', 'index.ts');
  const snapPath = resolve(pkgDir, 'api-surface.snap');

  if (!existsSync(indexPath)) {
    console.warn(`⚠️  packages/${pkg}/src/index.ts not found — skipping`);
    continue;
  }

  const src = readFileSync(indexPath, 'utf-8');
  const { values, types, stars } = extractExports(src);
  const snapshot = generateSnapshot(`@jira.js/${pkg}`, values, types, stars);

  if (mode === 'update') {
    writeFileSync(snapPath, snapshot, 'utf-8');
    console.log(`✅  Updated packages/${pkg}/api-surface.snap`);
    continue;
  }

  // mode === 'check'
  if (!existsSync(snapPath)) {
    console.error(`❌  packages/${pkg}/api-surface.snap not found.`);
    console.error(`    Run: node scripts/api-surface.mjs update`);
    allPassed = false;
    continue;
  }

  const committed = readFileSync(snapPath, 'utf-8');
  if (snapshot === committed) {
    console.log(`✅  packages/${pkg}/api-surface.snap matches current exports`);
  } else {
    console.error(`❌  packages/${pkg}/api-surface.snap has drifted:`);

    // Show a simple diff of the value/type lines
    const currentLines = new Set(snapshot.split('\n').filter(l => l.startsWith('  ')));
    const committedLines = new Set(committed.split('\n').filter(l => l.startsWith('  ')));

    for (const line of committedLines) {
      if (!currentLines.has(line)) {
        console.error(`    - ${line.trim()}  (REMOVED)`);
      }
    }
    for (const line of currentLines) {
      if (!committedLines.has(line)) {
        console.error(`    + ${line.trim()}  (ADDED)`);
      }
    }
    console.error(`    Run: node scripts/api-surface.mjs update  (then review and commit the diff)`);
    allPassed = false;
  }
}

if (mode === 'check') {
  if (!allPassed) {
    console.error('\n❌  API surface check failed — public exports changed without snapshot update.');
    process.exit(1);
  }
  console.log('\n✅  All API surface snapshots match.');
}
