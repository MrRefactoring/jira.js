// Install size governance for jira.js packages.
// Validates tarball sizes against committed thresholds.
// Tracks size history when run with --update-baseline.
// Usage: node scripts/size-check.mjs [--pack-dir <dir>] [--update-baseline]

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const DEFAULT_PACK_DIR = join(ROOT, 'dist-pack');
const BASELINE_FILE = join(ROOT, 'scripts/size-baselines.json');

const args = process.argv.slice(2);
const packDirIdx = args.indexOf('--pack-dir');
const PACK_DIR = packDirIdx !== -1 ? resolve(args[packDirIdx + 1]) : DEFAULT_PACK_DIR;
const UPDATE_BASELINE = args.includes('--update-baseline');

// Hard limits — build fails if tarball exceeds these
const HARD_LIMITS = {
  '@jira.js/base': 500 * 1024,    // 500 KB
  '@jira.js/cloud': 8 * 1024 * 1024,  // 8 MB (large generated model set)
  '@jira.js/agile': 1 * 1024 * 1024,  // 1 MB
};

// Warn threshold — percentage increase over baseline that triggers a warning
const WARN_THRESHOLD_PCT = 20;
// Fail threshold — percentage increase over baseline that fails the check
const FAIL_THRESHOLD_PCT = 50;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function readBaseline() {
  if (!existsSync(BASELINE_FILE)) return {};
  try {
    return JSON.parse(readFileSync(BASELINE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeBaseline(data) {
  writeFileSync(BASELINE_FILE, JSON.stringify(data, null, 2) + '\n');
}

function findTarball(packDir, nameFragment) {
  if (!existsSync(packDir)) return null;
  const files = readdirSync(packDir).filter(f => f.endsWith('.tgz') && f.includes(nameFragment));
  return files.length > 0 ? join(packDir, files[0]) : null;
}

const PACKAGES = [
  { name: '@jira.js/base', fragment: 'jira.js-base' },
  { name: '@jira.js/cloud', fragment: 'jira.js-cloud' },
  { name: '@jira.js/agile', fragment: 'jira.js-agile' },
];

function main() {
  console.log('📏 Install Size Governance — jira.js\n');

  const baseline = readBaseline();
  const results = [];
  let overallPass = true;
  const newBaseline = { ...baseline };

  for (const pkg of PACKAGES) {
    const tgzPath = findTarball(PACK_DIR, pkg.fragment);
    if (!tgzPath) {
      results.push({ name: pkg.name, pass: false, error: 'Tarball not found — run pack-validate.mjs first' });
      overallPass = false;
      continue;
    }

    const sizeBytes = statSync(tgzPath).size;
    const hardLimit = HARD_LIMITS[pkg.name];
    const errors = [];
    const warnings = [];

    // Hard limit check
    if (sizeBytes > hardLimit) {
      errors.push(`Exceeds hard limit: ${formatBytes(sizeBytes)} > ${formatBytes(hardLimit)}`);
    }

    // Baseline comparison
    const baselineSize = baseline[pkg.name];
    if (baselineSize) {
      const pctChange = ((sizeBytes - baselineSize) / baselineSize) * 100;
      if (pctChange > FAIL_THRESHOLD_PCT) {
        errors.push(`Size increased ${pctChange.toFixed(1)}% over baseline (limit: ${FAIL_THRESHOLD_PCT}%)`);
      } else if (pctChange > WARN_THRESHOLD_PCT) {
        warnings.push(`Size increased ${pctChange.toFixed(1)}% over baseline (warn: ${WARN_THRESHOLD_PCT}%)`);
      }
    }

    if (UPDATE_BASELINE || !baselineSize) {
      newBaseline[pkg.name] = sizeBytes;
    }

    const pass = errors.length === 0;
    if (!pass) overallPass = false;

    results.push({ name: pkg.name, sizeBytes, hardLimit, baselineSize, errors, warnings, pass });
  }

  // Update baseline file if requested
  if (UPDATE_BASELINE) {
    writeBaseline(newBaseline);
    console.log(`  Baseline updated: ${BASELINE_FILE}\n`);
  } else if (Object.keys(baseline).length === 0) {
    writeBaseline(newBaseline);
    console.log(`  Baseline initialized: ${BASELINE_FILE}\n`);
  }

  // Print results table
  console.log('  Package                  Size         Hard Limit    Status');
  console.log('  ' + '─'.repeat(70));
  for (const r of results) {
    if (r.error) {
      console.log(`  ${r.name.padEnd(26)} ${'N/A'.padEnd(13)} ${'N/A'.padEnd(14)} ❌ ${r.error}`);
      continue;
    }
    const sizeStr = formatBytes(r.sizeBytes);
    const limitStr = formatBytes(r.hardLimit);
    const baseStr = r.baselineSize ? ` (baseline: ${formatBytes(r.baselineSize)})` : ' (new baseline)';
    const status = r.pass ? '✅' : '❌';
    console.log(`  ${r.name.padEnd(26)} ${sizeStr.padEnd(13)} ${limitStr.padEnd(14)} ${status}${baseStr}`);

    for (const w of r.warnings ?? []) console.log(`     ⚠️  ${w}`);
    for (const e of r.errors ?? []) console.log(`     ❌ ${e}`);
  }

  if (overallPass) {
    console.log('\n  ✅ Size governance passed\n');
  } else {
    console.log('\n  ❌ Size governance FAILED\n');
    process.exit(1);
  }
}

main();
