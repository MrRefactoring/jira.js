import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const repoRoot = import.meta.dirname;

export default defineConfig(({ mode }) => ({
  test: {
    // Every suite that runs against a container of its own is excluded here, because each has its own config and its
    // own global setup and the container has to be brought up first: `tests/live/server` needs `pnpm jira-dc:up`,
    // `tests/live/jsm` needs `pnpm jsm-dc:up`. Left in, they do not merely fail — they fail with `undefined` where
    // their fixtures should be, because this run's global setup provides different ones. A new self-hosted surface
    // belongs on this list the day its directory appears.
    include: ['tests/live/**/*.test.ts'],
    exclude: ['tests/live/server/**', 'tests/live/jsm/**'],
    environment: 'node',
    reporters: ['verbose'],
    env: loadEnv(mode, repoRoot, ''),
    fileParallelism: false,
    globalSetup: ['./tests/live/setup/globalSetup.ts'],
    hookTimeout: 100_000,
    testTimeout: 100_000,
  },
  resolve: {
    alias: [{ find: /^#\/(.*)/, replacement: resolve(repoRoot, 'src/$1') }],
  },
}));
