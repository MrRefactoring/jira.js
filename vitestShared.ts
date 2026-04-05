export const vitestShared = {
  test: {
    environment: 'node' as const,
    fileParallelism: false,
    maxConcurrency: 1,
    testTimeout: 30_000,
    coverage: {
      provider: 'v8' as const,
      reporter: ['text', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      all: true,
      include: ['src/**/*.ts', 'packages/*/src/**/*.ts'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/tests/**',
        '**/*.config.*',
        // Generated Zod schema type containers — pure declarations, no runtime branching logic.
        // Excluding them removes ~94% coverage inflation from models/parameters.
        '**/models/**',
        '**/parameters/**',
        // Barrel re-exports — zero logic, import-only coverage is meaningless.
        '**/index.ts',
      ],
      // TODO(phase-2): raise thresholds once unit tests cover transport/auth/serialization paths.
      thresholds: {
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0,
      },
    },
  },
};
