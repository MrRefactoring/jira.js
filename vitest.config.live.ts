import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const repoRoot = import.meta.dirname;

export default defineConfig(({ mode }) => ({
  test: {
    // The Data Center suite runs against a container of its own, under its own config and its own global setup,
    // and has to be brought up first with `pnpm jira-dc:up`. Left in, it does not merely fail — it fails with
    // `undefined` where its fixtures should be, because this run's global setup provides different ones.
    include: ['tests/live/**/*.test.ts'],
    exclude: ['tests/live/server/**'],
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
