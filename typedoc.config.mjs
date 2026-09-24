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
  entryPointStrategy: 'resolve',
  exclude: ['**/*.test.ts'],
  plugin: ['typedoc-plugin-markdown', 'typedoc-vitepress-theme'],
  out: 'docs/api',
  router: 'kind',
  docsRoot: 'docs',
  cleanOutputDir: true,
  hidePageHeader: true,
  hideBreadcrumbs: true,
  sanitizeComments: true,
  useCodeBlocks: true,
  parametersFormat: 'table',
  sidebar: {
    autoConfiguration: true,
    format: 'vitepress',
  },
  readme: 'none',
  githubPages: false,
  name: 'jira.js',
  validation: { notExported: true },
};
