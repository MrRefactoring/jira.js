import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { defineConfig, mergeConfig } from 'vitest/config';
import { vitestShared } from '../../vitestShared';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

export default defineConfig(({ mode }) =>
  mergeConfig(
    vitestShared,
    defineConfig({
      resolve: {
        alias: {
          '~': resolve(__dirname, 'src'),
        },
      },
      test: {
        include: ['tests/**/*.test.ts'],
        env: loadEnv(mode, repoRoot, ''),
      },
    }),
  ),
);
