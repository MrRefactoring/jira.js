import { defineConfig } from 'vitest/config';

const isIntegration = process.env.VITEST_MODE === 'integration';

export default defineConfig({
  test: {
    typecheck: {
      enabled: true,
      tsconfig: 'tsconfig.lint.json',
    },
    setupFiles: ['dotenv/config'],
    ...(isIntegration && {
      globalSetup: ['./tests/integration/setup.ts'],
      globalTeardown: ['./tests/integration/teardown.ts'],
    }),
  },
  resolve: {
    alias: {
      '@jirajs': new URL('./src', import.meta.url).pathname,
      '@tests': new URL('./tests', import.meta.url).pathname,
    },
  },
});
