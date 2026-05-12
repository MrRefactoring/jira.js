import * as fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';
import { pollUntil } from '../live/helpers/pollUntil';

const SEED = 0xdeadbeef;

describe('pollUntil — stateful model: call count invariant', () => {
  it('fn call count equals first-success-attempt when predicate is satisfied before exhaustion', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 5 }),
        fc.integer({ min: 1, max: 5 }),
        async (successAttempt, maxAttempts) => {
          if (successAttempt > maxAttempts) return; // skip exhaustion case — tested separately

          let callCount = 0;
          const fn = vi.fn().mockImplementation(async () => {
            callCount++;
            return callCount;
          });

          const result = await pollUntil(fn, v => v === successAttempt, { maxAttempts, intervalMs: 0 });

          expect(result).toBe(successAttempt);
          expect(fn).toHaveBeenCalledTimes(successAttempt);
        },
      ),
      { seed: SEED, numRuns: 100 },
    );
  });

  it('fn call count equals maxAttempts when predicate is never satisfied', async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 8 }), async maxAttempts => {
        const fn = vi.fn().mockResolvedValue('never-matches');
        await pollUntil(fn, () => false, { maxAttempts, intervalMs: 0 }).catch(() => {});
        expect(fn).toHaveBeenCalledTimes(maxAttempts);
      }),
      { seed: SEED, numRuns: 50 },
    );
  });

  it('fn error at attempt k propagates immediately — exactly k calls total', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 1, max: 5 }),
        fc.integer({ min: 1, max: 5 }),
        async (errorAtAttempt, maxAttempts) => {
          if (errorAtAttempt > maxAttempts) return;

          let callCount = 0;
          const boom = new Error(`explode at attempt ${errorAtAttempt}`);

          const fn = vi.fn().mockImplementation(async () => {
            callCount++;
            if (callCount === errorAtAttempt) throw boom;
            return 'pending';
          });

          const thrown = await pollUntil(fn, () => false, { maxAttempts, intervalMs: 0 }).catch(e => e);
          expect(thrown).toBe(boom);
          expect(fn).toHaveBeenCalledTimes(errorAtAttempt);
        },
      ),
      { seed: SEED, numRuns: 100 },
    );
  });
});

describe('pollUntil — stateful model: return value invariant', () => {
  it('returned value is exactly what fn produced on the successful attempt', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string(),
        fc.integer({ min: 1, max: 5 }),
        async (finalValue, k) => {
          const sentinel = finalValue + '\x00_other'; // guaranteed different from finalValue
          let callCount = 0;
          const fn = vi.fn().mockImplementation(async () => {
            callCount++;
            return callCount === k ? finalValue : sentinel;
          });

          const result = await pollUntil(fn, v => v === finalValue, { maxAttempts: 5, intervalMs: 0 });

          expect(result).toBe(finalValue);
          expect(fn).toHaveBeenCalledTimes(k);
        },
      ),
      { seed: SEED, numRuns: 100 },
    );
  });

  it('predicate exception propagates immediately — fn called exactly once', async () => {
    await fc.assert(
      fc.asyncProperty(fc.string(), async _msg => {
        const boom = new TypeError('predicate crash');
        const fn = vi.fn().mockResolvedValue({ data: 'ok' });

        const thrown = await pollUntil(
          fn,
          () => {
            throw boom;
          },
          { maxAttempts: 5, intervalMs: 0 },
        ).catch(e => e);

        expect(thrown).toBe(boom);
        expect(fn).toHaveBeenCalledTimes(1);
      }),
      { seed: SEED, numRuns: 50 },
    );
  });
});

describe('pollUntil — stateful model: exhaustion message invariants', () => {
  it('exhaustion error always contains maxAttempts count', async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1, max: 8 }), async maxAttempts => {
        const err = await pollUntil(vi.fn().mockResolvedValue('x'), () => false, {
          maxAttempts,
          intervalMs: 0,
        }).catch(e => e);

        expect(err).toBeInstanceOf(Error);
        expect((err as Error).message).toContain(String(maxAttempts));
      }),
      { seed: SEED, numRuns: 50 },
    );
  });

  it('exhaustion error always contains intervalMs value', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: 5000 }),
        async intervalMs => {
          const err = await pollUntil(vi.fn().mockResolvedValue('x'), () => false, {
            maxAttempts: 1,
            intervalMs,
          }).catch(e => e);

          expect((err as Error).message).toContain(String(intervalMs));
        },
      ),
      { seed: SEED, numRuns: 50 },
    );
  });
});
