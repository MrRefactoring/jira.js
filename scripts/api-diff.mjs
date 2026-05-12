// API diff classification engine for jira.js.
// Compares current API surface snapshots against a git reference and classifies
// each change as BREAKING | MINOR | PATCH according to SEMVER_POLICY.md.
//
// Usage:
//   node scripts/api-diff.mjs                     — compare against HEAD~1
//   node scripts/api-diff.mjs --ref <git-ref>      — compare against tag/branch/commit
//   node scripts/api-diff.mjs --format json        — JSON output
//   node scripts/api-diff.mjs --format text        — human-readable (default)

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const PACKAGES = ['base', 'cloud', 'agile'];

const args = process.argv.slice(2);
const refIdx = args.indexOf('--ref');
const REF = refIdx !== -1 ? args[refIdx + 1] : 'HEAD~1';
const FORMAT = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'text';
const QUIET = args.includes('--quiet');

function run(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return null;
  }
}

function parseSnapshot(content) {
  if (!content) return { values: new Set(), types: new Set(), stars: new Set() };
  const lines = content.split('\n');
  const values = new Set();
  const types = new Set();
  const stars = new Set();
  let section = null;
  for (const line of lines) {
    if (line.startsWith('## Values')) { section = 'values'; continue; }
    if (line.startsWith('## Types')) { section = 'types'; continue; }
    if (line.startsWith('## Re-exports')) { section = 'stars'; continue; }
    if (line.startsWith('#') || !line.trim()) continue;
    const name = line.trim();
    if (section === 'values') values.add(name);
    else if (section === 'types') types.add(name);
    else if (section === 'stars') stars.add(name);
  }
  return { values, types, stars };
}

function getHistoricalSnapshot(pkg, ref) {
  const snapPath = `packages/${pkg}/api-surface.snap`;
  const content = run(`git show "${ref}:${snapPath}"`);
  return content;
}

function getCurrentSnapshot(pkg) {
  const snapPath = resolve(ROOT, 'packages', pkg, 'api-surface.snap');
  if (!existsSync(snapPath)) return null;
  return readFileSync(snapPath, 'utf8');
}

function classifyRemovedValue(name) {
  return { type: 'BREAKING', symbol: name, kind: 'value-removed', detail: `Exported value "${name}" was removed` };
}

function classifyRemovedType(name) {
  return { type: 'BREAKING', symbol: name, kind: 'type-removed', detail: `Exported type "${name}" was removed` };
}

function classifyAddedValue(name) {
  return { type: 'MINOR', symbol: name, kind: 'value-added', detail: `New exported value "${name}"` };
}

function classifyAddedType(name) {
  return { type: 'MINOR', symbol: name, kind: 'type-added', detail: `New exported type "${name}"` };
}

function classifyRemovedStar(path) {
  return { type: 'BREAKING', symbol: path, kind: 'reexport-removed', detail: `Re-export "export * from '${path}'" was removed` };
}

function classifyAddedStar(path) {
  return { type: 'MINOR', symbol: path, kind: 'reexport-added', detail: `New re-export "export * from '${path}'"` };
}

function diffPackage(pkg, refContent, currentContent) {
  const ref = parseSnapshot(refContent);
  const cur = parseSnapshot(currentContent);
  const changes = [];

  // Removed values → BREAKING
  for (const v of ref.values) {
    if (!cur.values.has(v)) changes.push(classifyRemovedValue(v));
  }
  // Added values → MINOR
  for (const v of cur.values) {
    if (!ref.values.has(v)) changes.push(classifyAddedValue(v));
  }
  // Removed types → BREAKING
  for (const t of ref.types) {
    if (!cur.types.has(t)) changes.push(classifyRemovedType(t));
  }
  // Added types → MINOR
  for (const t of cur.types) {
    if (!ref.types.has(t)) changes.push(classifyAddedType(t));
  }
  // Removed stars → BREAKING
  for (const s of ref.stars) {
    if (!cur.stars.has(s)) changes.push(classifyRemovedStar(s));
  }
  // Added stars → MINOR
  for (const s of cur.stars) {
    if (!ref.stars.has(s)) changes.push(classifyAddedStar(s));
  }

  return changes;
}

function determineBump(allChanges) {
  const hasBreaking = allChanges.some(c => c.type === 'BREAKING');
  const hasMinor = allChanges.some(c => c.type === 'MINOR');
  if (hasBreaking) return 'MAJOR';
  if (hasMinor) return 'MINOR';
  return 'PATCH';
}

async function main() {
  // Verify ref exists in git
  const refValid = run(`git rev-parse --verify "${REF}" 2>/dev/null`);
  if (!refValid) {
    if (!QUIET) console.warn(`⚠️  Git ref "${REF}" not found — no historical data to compare against.`);
    if (FORMAT === 'json') process.stdout.write(JSON.stringify({ ref: REF, error: 'ref-not-found', packages: {} }, null, 2) + '\n');
    process.exit(0);
  }

  const result = { ref: REF, packages: {}, overallBump: 'PATCH' };
  const allChanges = [];

  for (const pkg of PACKAGES) {
    const refContent = getHistoricalSnapshot(pkg, REF);
    const currentContent = getCurrentSnapshot(pkg);

    if (!refContent && !currentContent) {
      result.packages[pkg] = { status: 'missing', changes: [] };
      continue;
    }

    if (!refContent) {
      // Package didn't exist at ref — all current exports are MINOR additions
      result.packages[pkg] = { status: 'new-package', bump: 'MINOR', changes: [] };
      continue;
    }

    if (!currentContent) {
      result.packages[pkg] = { status: 'package-removed', bump: 'MAJOR', changes: [
        { type: 'BREAKING', kind: 'package-removed', symbol: `@jira.js/${pkg}`, detail: 'Package was removed' },
      ]};
      continue;
    }

    const changes = diffPackage(pkg, refContent, currentContent);
    const bump = determineBump(changes);
    result.packages[pkg] = { status: 'diffed', bump, changes };
    allChanges.push(...changes);
  }

  result.overallBump = determineBump(allChanges);

  if (FORMAT === 'json') {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    return;
  }

  // Human-readable text output
  console.log(`🔍 API Diff — jira.js vs ${REF}\n`);

  let hasChanges = false;

  for (const [pkg, data] of Object.entries(result.packages)) {
    const pkgName = `@jira.js/${pkg}`;
    if (data.status === 'missing') continue;
    if (data.status === 'new-package') {
      console.log(`  📦 ${pkgName} — NEW PACKAGE (MINOR)`);
      continue;
    }
    if (data.status === 'package-removed') {
      console.log(`  📦 ${pkgName} — PACKAGE REMOVED ❌ BREAKING`);
      hasChanges = true;
      continue;
    }

    const { changes, bump } = data;
    if (changes.length === 0) {
      console.log(`  📦 ${pkgName} — no API surface changes`);
      continue;
    }

    hasChanges = true;
    const bumpLabel = bump === 'MAJOR' ? '❌ BREAKING (MAJOR)' : bump === 'MINOR' ? '✅ MINOR' : '✅ PATCH';
    console.log(`  📦 ${pkgName} — ${bumpLabel}`);

    const breaking = changes.filter(c => c.type === 'BREAKING');
    const minor = changes.filter(c => c.type === 'MINOR');

    if (breaking.length > 0) {
      console.log(`     ❌ BREAKING (${breaking.length}):`);
      for (const c of breaking) console.log(`        • ${c.detail}`);
    }
    if (minor.length > 0) {
      console.log(`     ➕ MINOR (${minor.length}):`);
      for (const c of minor) console.log(`        • ${c.detail}`);
    }
  }

  if (!hasChanges) {
    console.log('  No API surface changes detected.');
  }

  const overallLabel = result.overallBump === 'MAJOR' ? '❌ MAJOR — breaking changes present'
    : result.overallBump === 'MINOR' ? '✅ MINOR — additive changes only'
    : '✅ PATCH — no API surface changes';

  console.log(`\n  Overall recommended semver bump: ${overallLabel}`);

  if (result.overallBump === 'MAJOR') {
    console.log('\n  ⚠️  Breaking changes detected. Review SEMVER_POLICY.md before releasing.');
    console.log('     Add a "major" changeset: pnpm changeset');
  } else if (result.overallBump === 'MINOR') {
    console.log('\n  Add a "minor" changeset: pnpm changeset');
  }

  console.log();
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
