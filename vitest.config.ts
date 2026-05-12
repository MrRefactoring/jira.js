import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { vitestShared } from './vitestShared';

const repoRoot = dirname(fileURLToPath(import.meta.url));

const TEST_PACKAGES_IN_ORDER = [
  // 'base',
  // 'cloud',
  'agile',
  // 'serviceDesk',
] as const;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, '');
  return {
    test: {
      ...vitestShared.test,
      env,
      maxWorkers: 1,
      minWorkers: 1,
      projects: TEST_PACKAGES_IN_ORDER.map(
        (pkg) => `./packages/${pkg}/vitest.config.ts`,
      ),
    },
  };
});
