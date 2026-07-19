import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      all: true,
      include: ['src/**/*.ts'],
      exclude: [
        // Zod schema/type containers — pure declarations, no runtime branching.
        'src/*/models/**',
        'src/*/parameters/**',
        // Barrel re-exports and the client factories — no logic of their own.
        '**/index.ts',
        'src/*/create*Client.ts',
      ],
    },
  },
  resolve: {
    alias: [{ find: /^#\/(.*)/, replacement: resolve(import.meta.dirname, 'src/$1') }],
  },
});
