import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@jira.js/base';
import { withRetry } from '../live/helpers/withRetry';

describe('withRetry — success paths', () => {
  it('returns immediately when fn succeeds on the first attempt', async () => {
    const fn = vi.fn().mockResolvedValue('result');

    const value = await withRetry(fn);

    expect(value).toBe('result');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('returns the value from the second attempt after a 429 on the first', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ApiError('rate limited', 429, 'Too Many Requests', null))
      .mockResolvedValueOnce('second-ok');

    const value = await withRetry(fn, { maxAttempts: 2, baseIntervalMs: 0 });

    expect(value).toBe('second-ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('succeeds on the third attempt after two 503s', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ApiError('', 503, 'Service Unavailable', null))
      .mockRejectedValueOnce(new ApiError('', 503, 'Service Unavailable', null))
      .mockResolvedValueOnce(42);

    const value = await withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 });

    expect(value).toBe(42);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe('withRetry — retryable status codes', () => {
  it('retries on 429 Too Many Requests', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ApiError('', 429, 'Too Many Requests', null))
      .mockResolvedValueOnce('ok');

    await withRetry(fn, { maxAttempts: 2, baseIntervalMs: 0 });

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('retries on 502 Bad Gateway', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ApiError('', 502, 'Bad Gateway', null))
      .mockResolvedValueOnce('ok');

    await withRetry(fn, { maxAttempts: 2, baseIntervalMs: 0 });

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('retries on 503 Service Unavailable', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ApiError('', 503, 'Service Unavailable', null))
      .mockResolvedValueOnce('ok');

    await withRetry(fn, { maxAttempts: 2, baseIntervalMs: 0 });

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('retries on 504 Gateway Timeout', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ApiError('', 504, 'Gateway Timeout', null))
      .mockResolvedValueOnce('ok');

    await withRetry(fn, { maxAttempts: 2, baseIntervalMs: 0 });

    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('withRetry — non-retryable status codes (fatal errors must not be hidden)', () => {
  it('does NOT retry on 401 Unauthorized — auth failures are fatal', async () => {
    const err = new ApiError('Unauthorized', 401, 'Unauthorized', null);
    const fn = vi.fn().mockRejectedValue(err);

    await expect(withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does NOT retry on 403 Forbidden — permission failures are fatal', async () => {
    const err = new ApiError('Forbidden', 403, 'Forbidden', null);
    const fn = vi.fn().mockRejectedValue(err);

    await expect(withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does NOT retry on 400 Bad Request — malformed requests are fatal', async () => {
    const err = new ApiError('Bad Request', 400, 'Bad Request', null);
    const fn = vi.fn().mockRejectedValue(err);

    await expect(withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does NOT retry on 404 Not Found — resource absence is fatal', async () => {
    const err = new ApiError('Not Found', 404, 'Not Found', null);
    const fn = vi.fn().mockRejectedValue(err);

    await expect(withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does NOT retry on 500 Internal Server Error — not in the retryable set', async () => {
    // 500 is deliberately NOT retried (indeterminate — the operation may have executed).
    // Only 502/503/504 (proxy/gateway errors where the backend was not reached) are retried.
    const err = new ApiError('Internal Server Error', 500, 'Internal Server Error', null);
    const fn = vi.fn().mockRejectedValue(err);

    await expect(withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does NOT retry TypeError (network errors) — not ApiError', async () => {
    const err = new TypeError('Failed to fetch');
    const fn = vi.fn().mockRejectedValue(err);

    await expect(withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does NOT retry ZodError-like plain errors (schema violations are fatal)', async () => {
    const err = new Error('ZodError: invalid_type');
    const fn = vi.fn().mockRejectedValue(err);

    await expect(withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 })).rejects.toBe(err);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('withRetry — exhaustion behavior', () => {
  it('throws an Error (not ApiError) after exhausting all retryable attempts', async () => {
    const fn = vi.fn().mockRejectedValue(new ApiError('rate limited', 429, 'Too Many Requests', null));

    const err = await withRetry(fn, { maxAttempts: 3, baseIntervalMs: 0 }).catch(e => e);

    expect(err).toBeInstanceOf(Error);
    expect(err).not.toBeInstanceOf(ApiError);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('exhaustion error message includes attempt count', async () => {
    const fn = vi.fn().mockRejectedValue(new ApiError('', 503, '', null));

    await expect(withRetry(fn, { maxAttempts: 2, baseIntervalMs: 0 })).rejects.toThrow('2 attempts failed');
  });

  it('exhaustion error message includes the last error message', async () => {
    const fn = vi.fn().mockRejectedValue(new ApiError('server gone', 503, 'Service Unavailable', null));

    await expect(withRetry(fn, { maxAttempts: 1, baseIntervalMs: 0 })).rejects.toThrow('server gone');
  });

  it('includes context tag in exhaustion message when context is provided', async () => {
    const fn = vi.fn().mockRejectedValue(new ApiError('', 429, '', null));

    await expect(
      withRetry(fn, { maxAttempts: 1, baseIntervalMs: 0, context: 'setup: create board' }),
    ).rejects.toThrow('[setup: create board]');
  });

  it('does NOT include context tag when context is omitted', async () => {
    const fn = vi.fn().mockRejectedValue(new ApiError('', 429, '', null));
    let caught: unknown;

    await withRetry(fn, { maxAttempts: 1, baseIntervalMs: 0 }).catch(e => {
      caught = e;
    });

    expect((caught as Error).message).not.toContain('[');
  });

  it('maxAttempts=1 means exactly one call before exhaustion', async () => {
    const fn = vi.fn().mockRejectedValue(new ApiError('', 503, '', null));

    await expect(withRetry(fn, { maxAttempts: 1, baseIntervalMs: 0 })).rejects.toThrow();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('withRetry — exponential backoff (fake timers)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('waits baseIntervalMs before the first retry (2^0 = 1)', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ApiError('', 503, '', null))
      .mockResolvedValueOnce('ok');

    const promise = withRetry(fn, { maxAttempts: 2, baseIntervalMs: 500 });

    // First call happens synchronously; now fn is waiting for the 500ms backoff.
    expect(fn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(499);
    // Second call has NOT happened yet.
    expect(fn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(1);
    // 500ms elapsed — second call triggered.
    const result = await promise;
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('waits 2×baseIntervalMs before the second retry (2^1 = 2)', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new ApiError('', 503, '', null))
      .mockRejectedValueOnce(new ApiError('', 503, '', null))
      .mockResolvedValueOnce('ok');

    const promise = withRetry(fn, { maxAttempts: 3, baseIntervalMs: 100 });

    expect(fn).toHaveBeenCalledTimes(1);
    // First retry delay: 100ms (100 * 2^0)
    await vi.advanceTimersByTimeAsync(100);
    expect(fn).toHaveBeenCalledTimes(2);

    // Second retry delay: 200ms (100 * 2^1)
    await vi.advanceTimersByTimeAsync(199);
    expect(fn).toHaveBeenCalledTimes(2); // Not yet
    await vi.advanceTimersByTimeAsync(1);
    const result = await promise;
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('does NOT sleep after the last attempt (no sleep on final exhaust)', async () => {
    const fn = vi.fn().mockRejectedValue(new ApiError('', 429, '', null));

    const promise = withRetry(fn, { maxAttempts: 2, baseIntervalMs: 1000 });
    // Pre-attach rejection handler before advancing time to prevent unhandled rejection warning.
    const rejectCheck = expect(promise).rejects.toThrow();

    // Advance past first retry delay
    await vi.advanceTimersByTimeAsync(1000);
    // The second (final) attempt fails. No more sleep should occur.
    await rejectCheck;
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
