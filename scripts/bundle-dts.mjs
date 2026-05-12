// Declaration bundler for jira.js packages.
// Uses rollup-plugin-dts to inline all internal types into a single dist/index.d.ts,
// eliminating #/ subpath imports and extensionless relative re-exports from published output.
//
// Usage: node scripts/bundle-dts.mjs <package-dir>
// Example: node scripts/bundle-dts.mjs packages/base

import { rollup } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const pkgDirArg = process.argv[2];

// If no arg provided, default to cwd (used when script is invoked from within the package dir).
const PKG_DIR = pkgDirArg
  ? (pkgDirArg.startsWith('/') ? pkgDirArg : resolve(ROOT, pkgDirArg))
  : process.cwd();
const DIST_DIR = join(PKG_DIR, 'dist');
const ENTRY = join(DIST_DIR, 'index.d.ts');

if (!existsSync(ENTRY)) {
  console.error(`Entry not found: ${ENTRY}`);
  console.error('Run the build first before bundling declarations.');
  process.exit(1);
}

const pkgJson = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'));
const pkgName = pkgJson.name;

console.log(`📦 Bundling declarations for ${pkgName}`);
console.log(`   Entry: ${ENTRY}`);

// Externalize all runtime dependencies — they keep their own types.
const externalPkgs = [
  ...Object.keys(pkgJson.dependencies ?? {}),
  ...Object.keys(pkgJson.peerDependencies ?? {}),
];
const externalRe = new RegExp(`^(${externalPkgs.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(/|$)`);

function isExternal(id) {
  if (externalPkgs.length === 0) return false;
  return externalRe.test(id);
}

// Resolve #/* paths to dist/* using the package.json imports field.
// rollup-plugin-dts needs compilerOptions.paths to resolve subpath imports.
const importsField = pkgJson.imports ?? {};
const paths = {};
for (const [key, value] of Object.entries(importsField)) {
  // "#/*" → "./dist/*" — convert to compilerOptions.paths format
  if (key.endsWith('/*')) {
    const prefix = key.slice(0, -1); // "#/"
    const target = typeof value === 'string' ? value : value?.default ?? value?.import ?? '';
    // target is "./dist/*" — convert to absolute path template for compilerOptions
    const absTarget = resolve(PKG_DIR, target.replace(/\*$/, '')); // absolute dist dir
    paths[prefix + '*'] = [join(absTarget, '*')];
  }
}

console.log(`   Externals: ${externalPkgs.join(', ') || '(none)'}`);
if (Object.keys(paths).length > 0) {
  console.log(`   Path mappings: ${Object.keys(paths).join(', ')}`);
}

let bundle;
try {
  bundle = await rollup({
    input: ENTRY,
    external: isExternal,
    plugins: [
      dts({
        respectExternal: true,
        compilerOptions: {
          paths,
          baseUrl: PKG_DIR,
          skipLibCheck: true,
        },
      }),
    ],
    onwarn(warning, warn) {
      // Suppress "Circular dependency" warnings — common in generated declaration trees
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      // Suppress "Missing exports" for type-only re-exports
      if (warning.code === 'MISSING_EXPORTS') return;
      warn(warning);
    },
  });
} catch (err) {
  console.error(`   ❌ rollup error: ${err.message}`);
  process.exit(1);
}

const { output } = await bundle.generate({
  format: 'es',
  file: join(DIST_DIR, 'index.d.ts'),
});

await bundle.close();

const bundledCode = output[0].code;
const lineCount = bundledCode.split('\n').length;
const sizeKb = (Buffer.byteLength(bundledCode, 'utf8') / 1024).toFixed(1);

console.log(`   Output: ${lineCount} lines, ${sizeKb} KB`);

// Write bundled index.d.ts (atomic: write to temp, rename)
const tmpFile = join(DIST_DIR, '_index_bundled.d.ts.tmp');
writeFileSync(tmpFile, bundledCode, 'utf8');
// Overwrite the original index.d.ts
writeFileSync(ENTRY, bundledCode, 'utf8');
rmSync(tmpFile, { force: true });

// Remove the source map for index (no longer accurate after bundling)
const indexMapFile = join(DIST_DIR, 'index.d.ts.map');
if (existsSync(indexMapFile)) rmSync(indexMapFile, { force: true });

// Clean up individual .d.ts / .d.ts.map files from subdirectories.
// Keep only: dist/index.d.ts and dist/index.d.cts.
// Remove all .d.ts and .d.ts.map from dist/** (not dist/*.d.ts at top level other than index).
let removedCount = 0;

function cleanDtsFiles(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      cleanDtsFiles(fullPath);
      // Remove empty directories
      try {
        const remaining = readdirSync(fullPath);
        if (remaining.length === 0) rmSync(fullPath, { recursive: true, force: true });
      } catch { /* ignore */ }
    } else if (stat.isFile()) {
      if (entry.endsWith('.d.ts') || entry.endsWith('.d.ts.map')) {
        // Keep dist/index.d.ts and dist/index.d.cts at top level
        if (dir === DIST_DIR && (entry === 'index.d.ts' || entry === 'index.d.cts')) {
          continue;
        }
        rmSync(fullPath, { force: true });
        removedCount++;
      }
    }
  }
}

cleanDtsFiles(DIST_DIR);
console.log(`   Cleaned ${removedCount} individual declaration file(s)`);

// Update dist/index.d.cts to use explicit .js extension for NodeNext compatibility.
const dctsFile = join(DIST_DIR, 'index.d.cts');
if (existsSync(dctsFile)) {
  const dctsContent = readFileSync(dctsFile, 'utf8');
  const updatedDcts = dctsContent.replace(
    /from\s+(['"])\.\/index\1/g,
    "from './index.js'",
  );
  if (updatedDcts !== dctsContent) {
    writeFileSync(dctsFile, updatedDcts, 'utf8');
    console.log(`   Updated index.d.cts: extensionless → .js`);
  }
} else {
  // Create .d.cts shim if missing
  writeFileSync(dctsFile, `export * from './index.js';\n`, 'utf8');
  console.log(`   Created index.d.cts shim`);
}

console.log(`✅ Declaration bundle complete: ${pkgName}`);
