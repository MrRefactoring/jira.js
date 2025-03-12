import { defineConfig } from 'vitest/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    typecheck: {
      enabled: true,
      tsconfig: 'tsconfig.lint.json',
    },
    setupFiles: ['dotenv/config'],
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@tests': new URL('./tests', import.meta.url).pathname,
    },
  },
  plugins: [tsconfigPaths({ configNames: ['tsconfig.json', 'tsconfig.lint.json'] })],
});
