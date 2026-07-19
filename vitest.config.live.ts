import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const repoRoot = import.meta.dirname;

export default defineConfig(({ mode }) => ({
  test: {
    include: ['tests/live/**/*.test.ts'],
    environment: 'node',
    reporters: ['verbose'],
    env: loadEnv(mode, repoRoot, ''),
    // Every live suite hits a single shared Jira Cloud site, so test files run
    // serially in one worker rather than racing each other for rate limits and
    // shared state. globalSetup sweeps marker-tagged issues a crashed run left
    // behind, before and after.
    fileParallelism: false,
    globalSetup: ['./tests/live/setup/globalSetup.ts'],
    hookTimeout: 100_000,
    testTimeout: 100_000,
  },
  resolve: {
    alias: [{ find: /^#\/(.*)/, replacement: resolve(repoRoot, 'src/$1') }],
  },
}));
