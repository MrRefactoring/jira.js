import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { lastOfAll } from './tests/live/setup/lastOfAll';

const repoRoot = import.meta.dirname;

/**
 * The `server` live suites, which run against the local Data Center container rather than a hosted site.
 *
 * Separate from `vitest.config.live.ts` because the two need different credentials and a different global setup: the
 * Cloud suites talk to a tenant that is always there, these talk to a container that has to be brought up first with
 * `pnpm jira-dc:up`.
 *
 * `instance.test.ts` runs last: it is allowed to leave Jira unusable — it ends by putting the instance into read-only
 * mode, which the Data Center API offers no way out of — so everything needing a working instance has to have finished.
 */
export default defineConfig(({ mode }) => {
  const serverEnv = loadEnv(mode, repoRoot, '');

  for (const [key, value] of Object.entries(serverEnv)) process.env[key] ??= value;

  return {
    test: {
      include: ['tests/live/server/**/*.test.ts'],
      environment: 'node',
      reporters: ['verbose'],
      env: serverEnv,
      fileParallelism: false,
      sequence: { sequencer: lastOfAll('instance.test.ts') },
      globalSetup: ['./tests/live/server/setup/globalSetup.ts'],
      setupFiles: ['./tests/live/server/setup/coverageCollector.ts'],
      hookTimeout: 120_000,
      testTimeout: 120_000,
    },
    resolve: {
      alias: [{ find: /^#\/(.*)/, replacement: resolve(repoRoot, 'src/$1') }],
    },
  };
});
