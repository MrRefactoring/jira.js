import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const repoRoot = import.meta.dirname;

/**
 * The schema audit: the live suite again, but with every response schema switched to strict.
 *
 * Separate from `vitest.config.live.ts` because the two answer different questions. The live run asks whether the
 * library still works — a field that vanished, a type that changed, an enum that grew. The audit asks whether the
 * schemas still describe what Jira actually sends, which loose validation cannot report by construction: letting
 * undocumented keys through is exactly what it is for.
 *
 * Failures here are usually not breakage. They mean Atlassian's published spec has fallen behind its own API.
 */
export default defineConfig(({ mode }) => ({
  test: {
    include: ['tests/live/**/*.test.ts'],
    exclude: ['tests/live/server/**'],
    environment: 'node',
    reporters: ['default'],
    env: {
      ...loadEnv(mode, repoRoot, ''),
      AUDIT_SCHEMAS: 'true',
      AUDIT_SCHEMAS_OUTPUT: resolve(repoRoot, 'node_modules/.cache/schema-audit.jsonl'),
    },
    fileParallelism: false,
    globalSetup: ['./tests/live/setup/globalSetup.ts'],
    setupFiles: ['./tests/live/setup/auditCollector.ts'],
    hookTimeout: 100_000,
    testTimeout: 100_000,
  },
  resolve: {
    alias: [{ find: /^#\/(.*)/, replacement: resolve(repoRoot, 'src/$1') }],
  },
}));
