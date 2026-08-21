import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { BaseSequencer } from 'vitest/node';

/**
 * Runs `index.test.ts` last, whatever the alphabet says.
 *
 * That file reindexes Assets, which takes the instance's Assets index away from everything else for as long as it
 * runs. Nothing else about the order matters, which is why this names one file rather than declaring a sequence.
 */
class LastOfAll extends BaseSequencer {
  async sort(files: Parameters<BaseSequencer['sort']>[0]): Promise<ReturnType<BaseSequencer['sort']>> {
    const sorted = await super.sort(files);
    const isLast = (file: (typeof sorted)[number]): boolean => file.moduleId.includes('index.test.ts');

    return [...sorted.filter(file => !isLast(file)), ...sorted.filter(isLast)];
  }
}

const repoRoot = import.meta.dirname;

/**
 * The Service Management live suites, which run against the local container rather than a hosted site.
 *
 * Separate from `vitest.config.server.ts` because the two need different containers: `atlassian/jira-software` carries
 * neither Service Management nor Assets, and the `server` suites need the boards only it has. Bring this one up with
 * `pnpm jsm-dc:up`.
 */
export default defineConfig(({ mode }) => ({
  test: {
    include: ['tests/live/jsm/**/*.test.ts'],
    environment: 'node',
    reporters: ['verbose'],
    env: loadEnv(mode, repoRoot, ''),
    fileParallelism: false,
    sequence: { sequencer: LastOfAll },
    globalSetup: ['./tests/live/jsm/setup/globalSetup.ts'],
    setupFiles: ['./tests/live/jsm/setup/coverageCollector.ts'],
    hookTimeout: 120_000,
    testTimeout: 120_000,
  },
  resolve: {
    alias: [{ find: /^#\/(.*)/, replacement: resolve(repoRoot, 'src/$1') }],
  },
}));
