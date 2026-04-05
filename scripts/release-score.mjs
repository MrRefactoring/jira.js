// Release readiness scoring for jira.js.
// Aggregates signals from governance checks and produces a composite score.
//
// Usage:
//   node scripts/release-score.mjs           — full score (runs all checks)
//   node scripts/release-score.mjs --fast    — skip slow checks (smoke, ATTW)
//   node scripts/release-score.mjs --format json
//
// Scoring categories:
//   API Governance     — exports map + surface snapshot clean
//   Release Integrity  — tarball valid + size within governance
//   Typings Quality    — ATTW (0 warnings) [skipped in --fast]
//   Runtime Integrity  — ESM + CJS + ts-strict + ts-bundler [skipped in --fast]
//
// Each category: 0–100. Composite = weighted average.

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');

const args = process.argv.slice(2);
const FAST = args.includes('--fast');
const FORMAT = args.includes('--format') ? args[args.indexOf('--format') + 1] : 'text';

function run(cmd) {
  try {
    execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { pass: true, output: '' };
  } catch (err) {
    return { pass: false, output: ((err.stdout || '') + (err.stderr || '')).trim() };
  }
}

function hasTarballs() {
  const packDir = join(ROOT, 'dist-pack');
  if (!existsSync(packDir)) return false;
  return readdirSync(packDir).some(f => f.endsWith('.tgz'));
}

function checkSizeBaselines() {
  try {
    const baselines = JSON.parse(readFileSync(join(ROOT, 'scripts/size-baselines.json'), 'utf8'));
    const packDir = join(ROOT, 'dist-pack');
    if (!existsSync(packDir)) return { pass: false, issue: 'dist-pack missing' };

    const files = readdirSync(packDir).filter(f => f.endsWith('.tgz'));
    for (const [pkg, baseline] of Object.entries(baselines)) {
      const fragment = pkg.replace('@', '').replace('/', '-').split('-').pop();
      const file = files.find(f => f.includes(fragment));
      if (!file) continue;
      const size = statSync(join(packDir, file)).size;
      if (size / baseline > 1.5) {
        return { pass: false, issue: `${pkg} size ${Math.round(size/1024)} KB > 150% of baseline ${Math.round(baseline/1024)} KB` };
      }
    }
    return { pass: true };
  } catch {
    return { pass: false, issue: 'size check error' };
  }
}

async function main() {
  if (FORMAT !== 'json') {
    console.log(`📊 Release Readiness Score — jira.js${FAST ? ' (fast mode)' : ''}\n`);
  }

  const scores = {};

  // ── Category 1: API Governance (always runs — cheap) ─────────────────────
  const exportsResult = run('node scripts/check-exports.mjs');
  const surfaceResult = run('node scripts/api-surface.mjs check');

  if (exportsResult.pass && surfaceResult.pass) {
    scores.governance = { score: 100, detail: 'Exports map + surface snapshot clean', weight: 1.0 };
  } else if (exportsResult.pass) {
    scores.governance = { score: 60, detail: 'Surface snapshot drifted — run api:surface:update', weight: 1.0 };
  } else if (surfaceResult.pass) {
    scores.governance = { score: 60, detail: 'Exports map issues', weight: 1.0 };
  } else {
    scores.governance = { score: 20, detail: 'Exports map + surface snapshot issues', weight: 1.0 };
  }

  // ── Category 2: Release Integrity (always runs — fast) ────────────────────
  const packResult = run('node scripts/pack-validate.mjs');
  const sizeCheck = checkSizeBaselines();

  if (packResult.pass && sizeCheck.pass) {
    scores.release = { score: 100, detail: 'Tarballs valid, size within governance', weight: 1.0 };
  } else if (packResult.pass && !sizeCheck.pass) {
    scores.release = { score: 70, detail: `Tarballs valid; size drift: ${sizeCheck.issue}`, weight: 1.0 };
  } else {
    scores.release = { score: 0, detail: 'Pack validation FAILED', weight: 1.0 };
  }

  // ── Category 3: Typings Quality (skipped in --fast) ───────────────────────
  if (!FAST) {
    const attwResult = run('node scripts/attw-check.mjs');
    if (attwResult.pass) {
      scores.typings = { score: 100, detail: 'ATTW: 0 warnings across all packages', weight: 1.0 };
    } else {
      const output = attwResult.output || '';
      if (output.includes('ATTW validation passed')) {
        scores.typings = { score: 80, detail: 'ATTW: known advisory warnings present', weight: 1.0 };
      } else {
        scores.typings = { score: 30, detail: 'ATTW: blocking type resolution problems', weight: 1.0 };
      }
    }
  } else {
    scores.typings = { score: null, detail: 'skipped (--fast)', weight: 0 };
  }

  // ── Category 4: Runtime Integrity (skipped in --fast) ─────────────────────
  if (!FAST) {
    const smokeResult = run('node scripts/smoke-consumers.mjs');
    if (smokeResult.pass) {
      scores.runtime = { score: 100, detail: 'All consumers pass (node-esm, node-cjs, ts-strict, ts-bundler)', weight: 1.0 };
    } else {
      // Check if only advisory consumers failed
      const output = smokeResult.output || '';
      if (output.includes('All consumer smoke tests passed')) {
        scores.runtime = { score: 85, detail: 'Blocking consumers pass; advisory consumer failed', weight: 1.0 };
      } else {
        scores.runtime = { score: 0, detail: 'Blocking consumer smoke FAILED', weight: 1.0 };
      }
    }
  } else {
    scores.runtime = { score: null, detail: 'skipped (--fast)', weight: 0 };
  }

  // Composite: average of non-skipped categories
  const active = Object.values(scores).filter(s => s.score !== null && s.weight > 0);
  const totalWeight = active.reduce((sum, s) => sum + s.weight, 0);
  const composite = totalWeight > 0
    ? Math.round(active.reduce((sum, s) => sum + s.score * s.weight, 0) / totalWeight)
    : 0;

  let recommendation;
  if (composite >= 95) recommendation = 'SAFE TO RELEASE';
  else if (composite >= 80) recommendation = 'REVIEW BEFORE RELEASE';
  else recommendation = 'NOT READY';

  const result = { composite, fast: FAST, scores, recommendation };

  if (FORMAT === 'json') {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    return;
  }

  console.log('  Category             Score   Details');
  console.log('  ' + '─'.repeat(70));

  const rows = [
    ['API Governance', scores.governance],
    ['Release Integrity', scores.release],
    ['Typings Quality', scores.typings],
    ['Runtime Integrity', scores.runtime],
  ];

  for (const [label, s] of rows) {
    const scoreStr = s.score !== null ? String(s.score).padStart(3) : ' --';
    console.log(`  ${label.padEnd(20)} ${scoreStr}     ${s.detail}`);
  }

  console.log('  ' + '─'.repeat(70));

  const compositeLabel = recommendation === 'SAFE TO RELEASE'
    ? `✅  ${recommendation}`
    : recommendation === 'REVIEW BEFORE RELEASE'
    ? `⚠️   ${recommendation}`
    : `❌  ${recommendation}`;

  console.log(`\n  Release Score: ${composite}/100  —  ${compositeLabel}\n`);

  const failing = Object.entries(scores).filter(([, s]) => s.score !== null && s.score < 100);
  if (failing.length > 0) {
    console.log('  Areas to improve:');
    for (const [cat, s] of failing) {
      console.log(`    • ${cat}: ${s.score}/100 — ${s.detail}`);
    }
    console.log();
  }
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
