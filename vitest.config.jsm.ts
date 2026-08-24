import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { lastOfAll } from './tests/live/setup/lastOfAll';

const repoRoot = import.meta.dirname;

/**
 * The Service Management live suites, which run against the local container rather than a hosted site.
 *
 * Separate from `vitest.config.server.ts` because the two need different containers: `atlassian/jira-software` carries
 * neither Service Management nor Assets, and the `server` suites need the boards only it has. Bring this one up with
 * `pnpm jsm-dc:up`.
 *
 * `index.test.ts` runs last: it reindexes Assets, which takes the instance's Assets index away from everything else
 * for as long as it runs.
 */
export default defineConfig(({ mode }) => {
  const jsmEnv = loadEnv(mode, repoRoot, '');

  for (const [key, value] of Object.entries(jsmEnv)) process.env[key] ??= value;

  return {
    test: {
      include: ['tests/live/jsm/**/*.test.ts'],
      environment: 'node',
      reporters: ['verbose'],
      env: jsmEnv,
      fileParallelism: false,
      sequence: { sequencer: lastOfAll('index.test.ts') },
      globalSetup: ['./tests/live/jsm/setup/globalSetup.ts'],
      setupFiles: ['./tests/live/jsm/setup/coverageCollector.ts'],
      hookTimeout: 120_000,
      testTimeout: 120_000,
    },
    resolve: {
      alias: [{ find: /^#\/(.*)/, replacement: resolve(repoRoot, 'src/$1') }],
    },
  };
});
