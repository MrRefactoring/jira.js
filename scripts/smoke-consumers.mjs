// Consumer smoke test orchestrator.
// Packs all packages, installs them into isolated temp dirs, runs each consumer smoke.
// Usage: node scripts/smoke-consumers.mjs [--pack-dir <dir>] [--keep-temp]

import { execSync, execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const CONSUMERS_DIR = join(ROOT, 'consumers');
const DEFAULT_PACK_DIR = join(ROOT, 'dist-pack');

const args = process.argv.slice(2);
const packDirIdx = args.indexOf('--pack-dir');
const PACK_DIR = packDirIdx !== -1 ? resolve(args[packDirIdx + 1]) : DEFAULT_PACK_DIR;
const KEEP_TEMP = args.includes('--keep-temp');

const PACKAGE_NAMES = ['@jira.js/base', '@jira.js/cloud', '@jira.js/agile'];

function run(cmd, cwd, env) {
  return execSync(cmd, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, ...env },
  }).trim();
}

function findTarball(packDir, pkgName) {
  const safeName = pkgName.replace('@', '').replace('/', '-');
  const files = readdirSync(packDir).filter(f => f.endsWith('.tgz') && f.includes(safeName.split('/').pop()));
  if (files.length === 0) {
    throw new Error(`No tarball found for ${pkgName} in ${packDir}. Run pack-validate.mjs first.`);
  }
  return join(packDir, files[0]);
}

function packIfNeeded(packDir) {
  if (!existsSync(packDir)) mkdirSync(packDir, { recursive: true });
  const existing = readdirSync(packDir).filter(f => f.endsWith('.tgz'));
  if (existing.length >= 3) {
    console.log('  Using existing tarballs in dist-pack/');
    return;
  }
  console.log('  Packing packages...');
  run('node scripts/pack-validate.mjs', ROOT);
}

function buildPackageDependencies(packDir) {
  return {
    '@jira.js/base': `file:${findTarball(packDir, '@jira.js/base')}`,
    '@jira.js/cloud': `file:${findTarball(packDir, '@jira.js/cloud')}`,
    '@jira.js/agile': `file:${findTarball(packDir, '@jira.js/agile')}`,
  };
}

const CONSUMERS = [
  {
    name: 'node-esm',
    dir: join(CONSUMERS_DIR, 'node-esm'),
    type: 'module',
    entryFile: 'smoke.mjs',
    run: (tempDir) => {
      const out = run(`node smoke.mjs`, tempDir);
      return out;
    },
    extraDevDeps: {},
  },
  {
    name: 'node-cjs',
    dir: join(CONSUMERS_DIR, 'node-cjs'),
    type: 'commonjs',
    entryFile: 'smoke.cjs',
    run: (tempDir) => {
      const out = run(`node smoke.cjs`, tempDir);
      return out;
    },
    extraDevDeps: {},
  },
  {
    name: 'ts-strict',
    dir: join(CONSUMERS_DIR, 'ts-strict'),
    type: 'module',
    entryFile: 'smoke.ts',
    // Phase 13: declaration bundler eliminated #/ and extensionless imports from published .d.ts.
    // Node16 moduleResolution now resolves all types correctly. Consumer is fully blocking.
    run: (tempDir) => {
      const out = run(`node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json`, tempDir);
      return out || '  (no errors)';
    },
    extraDevDeps: { typescript: 'latest' },
  },
  {
    name: 'ts-bundler',
    dir: join(CONSUMERS_DIR, 'ts-bundler'),
    type: 'module',
    entryFile: 'smoke.ts',
    run: (tempDir) => {
      const out = run(`node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json`, tempDir);
      return out || '  (no errors)';
    },
    extraDevDeps: { typescript: 'latest' },
  },
];

async function runConsumer(consumer, packageDeps) {
  const tempBase = join(tmpdir(), 'jira-js-smoke');
  if (!existsSync(tempBase)) mkdirSync(tempBase, { recursive: true });
  const tempDir = mkdtempSync(join(tempBase, `${consumer.name}-`));

  try {
    // Copy consumer source files into temp dir
    const files = readdirSync(consumer.dir);
    for (const file of files) {
      cpSync(join(consumer.dir, file), join(tempDir, file));
    }

    // Generate package.json
    const pkg = {
      name: `jira-js-smoke-${consumer.name}`,
      version: '0.0.0',
      private: true,
      type: consumer.type,
      dependencies: packageDeps,
      devDependencies: consumer.extraDevDeps,
    };
    writeFileSync(join(tempDir, 'package.json'), JSON.stringify(pkg, null, 2));

    // Install with npm (isolated from pnpm workspace)
    const installOutput = run('npm install --no-package-lock --loglevel=error', tempDir, {
      npm_config_fund: 'false',
      npm_config_audit: 'false',
    });

    // Run consumer smoke
    const result = consumer.run(tempDir);
    return { pass: true, output: result, tempDir };
  } catch (err) {
    const detail = [err.stdout, err.stderr].filter(Boolean).join('\n').trim();
    return { pass: false, output: detail || err.message, tempDir };
  } finally {
    if (!KEEP_TEMP && existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  }
}

async function main() {
  console.log('🧪 Consumer Smoke Tests — jira.js\n');

  packIfNeeded(PACK_DIR);
  const packageDeps = buildPackageDependencies(PACK_DIR);

  console.log(`\n  Tarballs:`);
  for (const [name, path] of Object.entries(packageDeps)) {
    console.log(`    ${name}: ${basename(path)}`);
  }
  console.log();

  const results = [];
  let overallPass = true;

  for (const consumer of CONSUMERS) {
    const isBlocking = consumer.blocking !== false;
    console.log(`  ▶ ${consumer.name}${isBlocking ? '' : ' (advisory)'}`);
    const result = await runConsumer(consumer, packageDeps);
    results.push({ name: consumer.name, blocking: isBlocking, ...result });

    if (result.pass) {
      const lines = result.output.split('\n').filter(Boolean);
      for (const line of lines) console.log(`  ${line}`);
      console.log();
    } else {
      if (isBlocking) overallPass = false;
      const label = isBlocking ? '❌ FAILED' : '⚠️  ADVISORY FAIL (non-blocking)';
      console.log(`  ${label}`);
      const lines = result.output.split('\n').slice(0, 20);
      for (const line of lines) console.log(`    ${line}`);
      if (KEEP_TEMP) console.log(`    Temp dir preserved: ${result.tempDir}`);
      console.log();
    }
  }

  console.log('─'.repeat(56));
  console.log('\n  Consumer               Status');
  console.log('  ' + '─'.repeat(36));
  for (const r of results) {
    let status;
    if (r.pass) {
      status = '✅ PASS';
    } else if (!r.blocking) {
      status = '⚠️  ADVISORY';
    } else {
      status = '❌ FAIL';
    }
    console.log(`  ${r.name.padEnd(24)} ${status}`);
  }

  if (overallPass) {
    console.log('\n  ✅ All consumer smoke tests passed\n');
  } else {
    console.log('\n  ❌ Consumer smoke tests FAILED\n');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
