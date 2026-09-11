import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { BaseSequencer } from 'vitest/node';

/**
 * Runs `instance.test.ts` last, whatever the alphabet says.
 *
 * That file is allowed to leave Jira unusable — it ends by putting the instance into read-only mode, which the Data
 * Center API offers no way out of — so everything that needs a working instance has to have finished. Nothing else
 * about the order matters, which is why this names one file rather than declaring a sequence.
 */
class LastOfAll extends BaseSequencer {
  async sort(files: Parameters<BaseSequencer['sort']>[0]): Promise<ReturnType<BaseSequencer['sort']>> {
    const sorted = await super.sort(files);
    const isLast = (file: (typeof sorted)[number]): boolean => file.moduleId.includes('instance.test.ts');

    return [...sorted.filter(file => !isLast(file)), ...sorted.filter(isLast)];
  }
}

const repoRoot = import.meta.dirname;

/**
 * The `server` live suites, which run against the local Data Center container rather than a hosted site.
 *
 * Separate from `vitest.config.live.ts` because the two need different credentials and a different global setup: the
 * Cloud suites talk to a tenant that is always there, these talk to a container that has to be brought up first with
 * `pnpm jira-dc:up`.
 */
export default defineConfig(({ mode }) => ({
  test: {
    include: ['tests/live/server/**/*.test.ts'],
    environment: 'node',
    reporters: ['verbose'],
    env: loadEnv(mode, repoRoot, ''),
    fileParallelism: false,
    sequence: { sequencer: LastOfAll },
    globalSetup: ['./tests/live/server/setup/globalSetup.ts'],
    setupFiles: ['./tests/live/server/setup/coverageCollector.ts'],
    hookTimeout: 120_000,
    testTimeout: 120_000,
  },
  resolve: {
    alias: [{ find: /^#\/(.*)/, replacement: resolve(repoRoot, 'src/$1') }],
  },
}));
