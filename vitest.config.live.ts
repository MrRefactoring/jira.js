import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const repoRoot = import.meta.dirname;

export default defineConfig(({ mode }) => ({
  test: {
    // Not `tests/live/server` — those run against a container that has to be brought up first, under their own
    // config and their own global setup. Left in, every one of them fails with a connection refused.
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
