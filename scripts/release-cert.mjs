// Release certification pipeline for jira.js.
// Runs all pre-publish checks in sequence and produces a certification result.
// A release should only be published if this script exits with code 0.
//
// Checks (in order):
//   1. API governance (exports map + surface snapshot)
//   2. Pack validation (tarball contents, required files, size)
//   3. Consumer smoke tests (node-esm, node-cjs, ts-strict, ts-bundler)
//   4. ATTW type resolution check
//   5. Install size governance
//
// Usage: node scripts/release-cert.mjs [--skip-consumers] [--skip-attw]

import { execSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const args = process.argv.slice(2);
const SKIP_CONSUMERS = args.includes('--skip-consumers');
const SKIP_ATTW = args.includes('--skip-attw');

function run(scriptPath, label) {
  const start = Date.now();
  try {
    const output = execSync(`node "${scriptPath}"`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    return { pass: true, output, elapsed };
  } catch (err) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    return {
      pass: false,
      output: (err.stdout || '') + (err.stderr || ''),
      elapsed,
    };
  }
}

const CHECKS = [
  {
    id: 'governance',
    label: '🔏 API Governance',
    script: join(ROOT, 'scripts/check-exports.mjs'),
    required: true,
  },
  {
    id: 'surface',
    label: '📋 API Surface Snapshots',
    script: join(ROOT, 'scripts/api-surface.mjs'),
    scriptArgs: ['check'],
    required: true,
  },
  {
    id: 'pack',
    label: '🗜️  Pack Validation',
    script: join(ROOT, 'scripts/pack-validate.mjs'),
    required: true,
  },
  {
    id: 'consumers',
    label: '🧪 Consumer Smoke Tests',
    script: join(ROOT, 'scripts/smoke-consumers.mjs'),
    required: true,
    skip: () => SKIP_CONSUMERS,
  },
  {
    id: 'attw',
    label: '🔬 Type Resolution (ATTW)',
    script: join(ROOT, 'scripts/attw-check.mjs'),
    required: false,
    skip: () => SKIP_ATTW,
  },
  {
    id: 'size',
    label: '📏 Install Size Governance',
    script: join(ROOT, 'scripts/size-check.mjs'),
    required: true,
  },
];

function runScript(script, scriptArgs) {
  const scriptWithArgs = scriptArgs ? `${script} ${scriptArgs.join(' ')}` : script;
  const start = Date.now();
  try {
    const output = execSync(`node "${script}"${scriptArgs ? ' ' + scriptArgs.join(' ') : ''}`, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { pass: true, output, elapsed: ((Date.now() - start) / 1000).toFixed(1) };
  } catch (err) {
    return {
      pass: false,
      output: (err.stdout || '') + (err.stderr || ''),
      elapsed: ((Date.now() - start) / 1000).toFixed(1),
    };
  }
}

async function main() {
  const timestamp = new Date().toISOString();
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║       jira.js — Release Certification Pipeline        ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log(`\n  Time: ${timestamp}\n`);

  const results = [];
  let certificationPass = true;

  for (const check of CHECKS) {
    if (check.skip?.()) {
      console.log(`  ⏭  ${check.label} — skipped`);
      results.push({ id: check.id, label: check.label, status: 'skipped' });
      continue;
    }

    process.stdout.write(`  ⏳ ${check.label}...`);
    const result = runScript(check.script, check.scriptArgs);

    if (result.pass) {
      console.log(` ✅  (${result.elapsed}s)`);
    } else {
      const severity = check.required ? '❌' : '⚠️ ';
      console.log(` ${severity}  (${result.elapsed}s)`);
      if (check.required) certificationPass = false;

      const lines = result.output.split('\n').filter(Boolean).slice(0, 15);
      for (const line of lines) console.log(`       ${line}`);
      if (result.output.split('\n').length > 15) {
        console.log(`       ... (${result.output.split('\n').length - 15} more lines)`);
      }
    }

    results.push({
      id: check.id,
      label: check.label,
      status: result.pass ? 'pass' : (check.required ? 'fail' : 'warn'),
      elapsed: result.elapsed,
    });
  }

  console.log('\n  ' + '─'.repeat(54));
  console.log('\n  Certification Summary:');
  for (const r of results) {
    const icon = r.status === 'pass' ? '✅' : r.status === 'skipped' ? '⏭ ' : r.status === 'warn' ? '⚠️ ' : '❌';
    const elapsed = r.elapsed ? ` (${r.elapsed}s)` : '';
    console.log(`    ${icon} ${r.label}${elapsed}`);
  }

  console.log();
  if (certificationPass) {
    console.log('  ╔══════════════════════════════════════════════╗');
    console.log('  ║  ✅  RELEASE CERTIFIED — safe to publish      ║');
    console.log('  ╚══════════════════════════════════════════════╝\n');
  } else {
    console.log('  ╔══════════════════════════════════════════════╗');
    console.log('  ║  ❌  RELEASE NOT CERTIFIED — DO NOT publish   ║');
    console.log('  ╚══════════════════════════════════════════════╝\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
