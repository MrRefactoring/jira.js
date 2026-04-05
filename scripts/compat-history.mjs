// Compatibility history tracker for jira.js.
// Records a snapshot of API surface size, package sizes, and export counts at a point in time.
// Used to track ecosystem drift and API churn over releases.
//
// Usage:
//   node scripts/compat-history.mjs record [--version <ver>]  — record current state
//   node scripts/compat-history.mjs show                       — print history table
//   node scripts/compat-history.mjs diff <entry-a> <entry-b>  — diff two entries by date

import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const HISTORY_FILE = join(ROOT, 'scripts/compat-history.json');
const PACKAGES = ['base', 'cloud', 'agile'];
const PACK_DIR = join(ROOT, 'dist-pack');

const args = process.argv.slice(2);
const cmd = args[0] ?? 'show';

function readHistory() {
  if (!existsSync(HISTORY_FILE)) return { entries: [] };
  return JSON.parse(readFileSync(HISTORY_FILE, 'utf8'));
}

function writeHistory(data) {
  writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function parseSnapshot(content) {
  if (!content) return { values: 0, types: 0, stars: 0 };
  const lines = content.split('\n');
  let values = 0, types = 0, stars = 0;
  let section = null;
  for (const line of lines) {
    if (line.startsWith('## Values')) { section = 'values'; continue; }
    if (line.startsWith('## Types')) { section = 'types'; continue; }
    if (line.startsWith('## Re-exports')) { section = 'stars'; continue; }
    if (line.startsWith('#') || !line.trim()) continue;
    if (section === 'values') values++;
    else if (section === 'types') types++;
    else if (section === 'stars') stars++;
  }
  return { values, types, stars };
}

function getTarballSize(pkgName) {
  if (!existsSync(PACK_DIR)) return null;
  const safeName = pkgName.replace('@', '').replace('/', '-');
  const files = readdirSync(PACK_DIR).filter(f => f.endsWith('.tgz') && f.includes(safeName.split('/').pop()));
  if (files.length === 0) return null;
  return statSync(join(PACK_DIR, files[0])).size;
}

function getPackageVersion(pkg) {
  const pkgJson = JSON.parse(readFileSync(join(ROOT, 'packages', pkg, 'package.json'), 'utf8'));
  return pkgJson.version;
}

function recordEntry(versionOverride) {
  const history = readHistory();
  const date = new Date().toISOString().slice(0, 10);
  const entry = { date, packages: {} };

  for (const pkg of PACKAGES) {
    const pkgName = `@jira.js/${pkg}`;
    const snapPath = join(ROOT, 'packages', pkg, 'api-surface.snap');
    const snapContent = existsSync(snapPath) ? readFileSync(snapPath, 'utf8') : null;
    const { values, types, stars } = parseSnapshot(snapContent);
    const tarballSize = getTarballSize(pkgName);
    const version = versionOverride ?? getPackageVersion(pkg);

    entry.packages[pkgName] = {
      version,
      tarballSizeBytes: tarballSize,
      tarballSizeKb: tarballSize ? Math.round(tarballSize / 1024 * 10) / 10 : null,
      exportedValues: values,
      exportedTypes: types,
      reexports: stars,
      totalSymbols: values + types,
    };
  }

  // Avoid duplicate entries for same date — update if exists
  const existingIdx = history.entries.findIndex(e => e.date === date);
  if (existingIdx !== -1) {
    history.entries[existingIdx] = entry;
    console.log(`  Updated existing entry for ${date}`);
  } else {
    history.entries.push(entry);
    console.log(`  Recorded entry for ${date}`);
  }

  writeHistory(history);

  for (const [pkg, data] of Object.entries(entry.packages)) {
    const sizeStr = data.tarballSizeKb ? `${data.tarballSizeKb} KB` : 'N/A';
    console.log(`  ${pkg.padEnd(20)} v${data.version}  size: ${sizeStr}  symbols: ${data.totalSymbols} (${data.exportedValues} values + ${data.exportedTypes} types)`);
  }
}

function showHistory() {
  const history = readHistory();
  if (history.entries.length === 0) {
    console.log('No history entries yet. Run: node scripts/compat-history.mjs record');
    return;
  }

  console.log('📊 Compatibility History — jira.js\n');

  for (const pkg of PACKAGES) {
    const pkgName = `@jira.js/${pkg}`;
    console.log(`  ${pkgName}`);
    console.log(`  ${'─'.repeat(68)}`);
    console.log(`  ${'Date'.padEnd(12)} ${'Version'.padEnd(10)} ${'Size'.padEnd(12)} ${'Values'.padEnd(10)} ${'Types'.padEnd(10)} Total`);

    for (const entry of history.entries) {
      const data = entry.packages[pkgName];
      if (!data) continue;
      const sizeStr = data.tarballSizeKb ? `${data.tarballSizeKb} KB` : 'N/A';
      console.log(`  ${entry.date.padEnd(12)} ${('v' + data.version).padEnd(10)} ${sizeStr.padEnd(12)} ${String(data.exportedValues).padEnd(10)} ${String(data.exportedTypes).padEnd(10)} ${data.totalSymbols}`);
    }
    console.log();
  }

  // Show drift summary if multiple entries
  if (history.entries.length >= 2) {
    const first = history.entries[0];
    const last = history.entries[history.entries.length - 1];
    console.log(`  Drift: ${first.date} → ${last.date}`);
    console.log(`  ${'─'.repeat(60)}`);

    for (const pkg of PACKAGES) {
      const pkgName = `@jira.js/${pkg}`;
      const f = first.packages[pkgName];
      const l = last.packages[pkgName];
      if (!f || !l) continue;
      const sizeDelta = l.tarballSizeKb && f.tarballSizeKb ? (l.tarballSizeKb - f.tarballSizeKb).toFixed(1) : 'N/A';
      const symbolDelta = l.totalSymbols - f.totalSymbols;
      const sizeSign = sizeDelta > 0 ? '+' : '';
      const symSign = symbolDelta > 0 ? '+' : '';
      console.log(`  ${pkgName.padEnd(22)} size: ${sizeSign}${sizeDelta} KB  symbols: ${symSign}${symbolDelta}`);
    }
    console.log();
  }
}

function diffEntries(dateA, dateB) {
  const history = readHistory();
  const entryA = history.entries.find(e => e.date === dateA);
  const entryB = history.entries.find(e => e.date === dateB);

  if (!entryA) { console.error(`No entry found for date: ${dateA}`); process.exit(1); }
  if (!entryB) { console.error(`No entry found for date: ${dateB}`); process.exit(1); }

  console.log(`📊 Compat Diff: ${dateA} → ${dateB}\n`);

  for (const pkg of PACKAGES) {
    const pkgName = `@jira.js/${pkg}`;
    const a = entryA.packages[pkgName];
    const b = entryB.packages[pkgName];
    if (!a || !b) continue;

    console.log(`  ${pkgName}`);
    const sizeDelta = b.tarballSizeKb && a.tarballSizeKb ? (b.tarballSizeKb - a.tarballSizeKb).toFixed(1) : null;
    const symbolDelta = b.totalSymbols - a.totalSymbols;
    const sign = n => n > 0 ? `+${n}` : `${n}`;

    if (sizeDelta !== null) console.log(`    Size:    ${a.tarballSizeKb} KB → ${b.tarballSizeKb} KB (${sign(parseFloat(sizeDelta))} KB)`);
    console.log(`    Symbols: ${a.totalSymbols} → ${b.totalSymbols} (${sign(symbolDelta)})`);
    console.log(`    Values:  ${a.exportedValues} → ${b.exportedValues} (${sign(b.exportedValues - a.exportedValues)})`);
    console.log(`    Types:   ${a.exportedTypes} → ${b.exportedTypes} (${sign(b.exportedTypes - a.exportedTypes)})`);
    console.log();
  }
}

if (cmd === 'record') {
  const versionIdx = args.indexOf('--version');
  const version = versionIdx !== -1 ? args[versionIdx + 1] : undefined;
  console.log('📝 Recording compatibility snapshot...\n');
  recordEntry(version);
} else if (cmd === 'show') {
  showHistory();
} else if (cmd === 'diff') {
  const dateA = args[1];
  const dateB = args[2];
  if (!dateA || !dateB) {
    console.error('Usage: node scripts/compat-history.mjs diff <date-a> <date-b>');
    process.exit(1);
  }
  diffEntries(dateA, dateB);
} else {
  console.error(`Unknown command: ${cmd}`);
  console.error('Usage: node scripts/compat-history.mjs [record|show|diff]');
  process.exit(1);
}
