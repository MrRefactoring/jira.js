import { readFileSync } from 'node:fs';

const { exports: subpaths } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

/**
 * Entry points come from the package's own `exports` rather than from a list kept here.
 *
 * That makes the reference document exactly what a caller can import — no internal module reaches it by sitting in a
 * documented directory, and no surface is forgotten the day it is added. `./browser` is the prebuilt bundle and
 * `./package.json` is not code.
 */
const entryPoints = Object.entries(subpaths)
  .filter(([subpath]) => subpath !== './browser' && subpath !== './package.json')
  .map(([, target]) => target.types.replace('./dist/', 'src/').replace(/\.d\.ts$/, '.ts'));

export default {
  $schema: 'https://typedoc.org/schema.json',
  entryPoints,
  // `resolve` follows the exports of each entry point. `expand` — the previous setting — walked every file in the
  // directory instead, which published four internal `core` modules as API and produced a page per generated model
  // that said only `type X = z.infer<typeof XSchema>`.
  entryPointStrategy: 'resolve',
  exclude: ['**/*.test.ts'],
  out: 'docs/public/api',
  readme: 'none',
  githubPages: false,
  name: 'jira.js',
  navigationLinks: {
    Guide: 'https://mrrefactoring.github.io/jira.js/guide/getting-started',
    GitHub: 'https://github.com/MrRefactoring/jira.js',
  },
  // A public type built out of something the package does not export cannot be named by a caller. Left unchecked that
  // is invisible; here it fails the documentation build.
  validation: { notExported: true },
};
