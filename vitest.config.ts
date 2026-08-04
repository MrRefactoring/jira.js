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
        'src/*/models/**',
        'src/*/parameters/**',
        '**/index.ts',
        'src/*/create*Client.ts',
      ],
    },
  },
  resolve: {
    alias: [{ find: /^#\/(.*)/, replacement: resolve(import.meta.dirname, 'src/$1') }],
  },
});
