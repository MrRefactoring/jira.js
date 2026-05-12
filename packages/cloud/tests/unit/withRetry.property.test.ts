import * as fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { ApiError } from '@jira.js/base';
import { withRetry } from '../live/helpers/withRetry';

const SEED = 0xdeadbeef;

const RETRYABLE = [429, 502, 503, 504] as const;
const FATAL = [400, 401, 403, 404, 500] as const;

describe('withRetry — property: bounded execution', () => {
  it('fn is called at most maxAttempts times for any retryable status code', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 5 }),
        fc.constantFrom(...RETRYABLE),
        async (maxAttempts, status) => {
          const fn = vi.fn().mockRejectedValue(new ApiError('', status, '', null));
          await withRetry(fn, { maxAttempts, baseIntervalMs: 0 }).catch(() => {});
          expect(fn).toHaveBeenCalledTimes(maxAttempts);
        },
      ),
      { seed: SEED, numRuns: 50 },
    );
  });

  it('fn is called exactly once for any fatal status code regardless of maxAttempts', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 5 }),
        fc.constantFrom(...FATAL),
        async (maxAttempts, status) => {
          const fn = vi.fn().mockRejectedValue(new ApiError('fatal', status, '', null));
          await withRetry(fn, { maxAttempts, baseIntervalMs: 0 }).catch(() => {});
          expect(fn).toHaveBeenCalledTimes(1);
        },
      ),
      { seed: SEED, numRuns: 50 },
    );
  });

  it('non-ApiError is treated as fatal — exactly one call, any maxAttempts', async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 5 }), async maxAttempts => {
        const err = new TypeError('network failure');
        const fn = vi.fn().mockRejectedValue(err);
        await withRetry(fn, { maxAttempts, baseIntervalMs: 0 }).catch(() => {});
        expect(fn).toHaveBeenCalledTimes(1);
      }),
      { seed: SEED, numRuns: 50 },
    );
  });
});

describe('withRetry — property: success-at-k invariant', () => {
  it('fn that succeeds on attempt k is called exactly k times (k ∈ [1..maxAttempts])', async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 5 }), async k => {
        const maxAttempts = 5;
        const fn = vi.fn();

        for (let i = 0; i < k - 1; i++) {
          fn.mockRejectedValueOnce(new ApiError('', 429, '', null));
        }
        fn.mockResolvedValueOnce(`ok-at-${k}`);

        const result = await withRetry(fn, { maxAttempts, baseIntervalMs: 0 });

        expect(result).toBe(`ok-at-${k}`);
        expect(fn).toHaveBeenCalledTimes(k);
      }),
      { seed: SEED, numRuns: 50 },
    );
  });

  it('returns the exact value from the successful call', async () => {
    await fc.assert(
      fc.asyncProperty(fc.string(), async successValue => {
        const fn = vi
          .fn()
          .mockRejectedValueOnce(new ApiError('', 429, '', null))
          .mockResolvedValueOnce(successValue);

        const result = await withRetry(fn, { maxAttempts: 2, baseIntervalMs: 0 });
        expect(result).toBe(successValue);
      }),
      { seed: SEED, numRuns: 100 },
    );
  });
});

describe('withRetry — property: fatal error identity', () => {
  it('fatal ApiError is rethrown as the exact same object reference', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...FATAL),
        fc.integer({ min: 1, max: 5 }),
        async (status, maxAttempts) => {
          const err = new ApiError('fatal', status, '', null);
          const fn = vi.fn().mockRejectedValue(err);
          const thrown = await withRetry(fn, { maxAttempts, baseIntervalMs: 0 }).catch(e => e);
          expect(thrown).toBe(err);
        },
      ),
      { seed: SEED, numRuns: 50 },
    );
  });

  it('non-ApiError is rethrown as the exact same object reference', async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 5 }), async maxAttempts => {
        const err = new TypeError('network failure');
        const fn = vi.fn().mockRejectedValue(err);
        const thrown = await withRetry(fn, { maxAttempts, baseIntervalMs: 0 }).catch(e => e);
        expect(thrown).toBe(err);
      }),
      { seed: SEED, numRuns: 50 },
    );
  });

  it('exhaustion error is a plain Error, not ApiError, and contains attempt count', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 5 }),
        fc.constantFrom(...RETRYABLE),
        async (maxAttempts, status) => {
          const fn = vi.fn().mockRejectedValue(new ApiError('', status, '', null));
          const thrown = await withRetry(fn, { maxAttempts, baseIntervalMs: 0 }).catch(e => e);

          expect(thrown).toBeInstanceOf(Error);
          expect(thrown).not.toBeInstanceOf(ApiError);
          expect((thrown as Error).message).toContain(String(maxAttempts));
        },
      ),
      { seed: SEED, numRuns: 50 },
    );
  });
});
