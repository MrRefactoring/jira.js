import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { pollUntil } from '../live/helpers/pollUntil';

describe('pollUntil — predicate satisfied immediately', () => {
  it('returns on the first attempt when predicate is immediately true', async () => {
    const fn = vi.fn().mockResolvedValue(42);
    const predicate = vi.fn().mockReturnValue(true);

    const result = await pollUntil(fn, predicate, { maxAttempts: 5, intervalMs: 0 });

    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(predicate).toHaveBeenCalledTimes(1);
    expect(predicate).toHaveBeenCalledWith(42);
  });

  it('passes the fn result to the predicate', async () => {
    const fn = vi.fn().mockResolvedValue({ status: 'DONE' });
    const predicate = vi.fn().mockImplementation((v: { status: string }) => v.status === 'DONE');

    await pollUntil(fn, predicate, { intervalMs: 0 });

    expect(predicate).toHaveBeenCalledWith({ status: 'DONE' });
  });
});

describe('pollUntil — predicate eventually satisfied', () => {
  it('calls fn multiple times until predicate returns true', async () => {
    const fn = vi
      .fn()
      .mockResolvedValueOnce('pending')
      .mockResolvedValueOnce('pending')
      .mockResolvedValueOnce('done');

    const predicate = (v: string) => v === 'done';

    const result = await pollUntil(fn, predicate, { maxAttempts: 5, intervalMs: 0 });

    expect(result).toBe('done');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('returns the last value when predicate succeeds on the final allowed attempt', async () => {
    const fn = vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(false).mockResolvedValueOnce(true);

    const result = await pollUntil(fn, v => v === true, { maxAttempts: 3, intervalMs: 0 });

    expect(result).toBe(true);
    expect(fn).toHaveBeenCalledTimes(3);
  });
});

describe('pollUntil — exhaustion behavior', () => {
  it('throws when predicate is never satisfied after maxAttempts', async () => {
    const fn = vi.fn().mockResolvedValue('not-done');

    await expect(
      pollUntil(fn, v => v === 'done', { maxAttempts: 3, intervalMs: 0 }),
    ).rejects.toThrow();
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('calls fn exactly maxAttempts times before throwing', async () => {
    const fn = vi.fn().mockResolvedValue('never');

    await pollUntil(fn, () => false, { maxAttempts: 4, intervalMs: 0 }).catch(() => {});

    expect(fn).toHaveBeenCalledTimes(4);
  });

  it('maxAttempts=1 means exactly one call before throwing', async () => {
    const fn = vi.fn().mockResolvedValue('nope');

    await expect(pollUntil(fn, () => false, { maxAttempts: 1, intervalMs: 0 })).rejects.toThrow();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('error message includes attempt count', async () => {
    const fn = vi.fn().mockResolvedValue('x');

    await expect(
      pollUntil(fn, () => false, { maxAttempts: 5, intervalMs: 0 }),
    ).rejects.toThrow('5 attempts');
  });

  it('error message includes intervalMs', async () => {
    const fn = vi.fn().mockResolvedValue('x');

    await expect(
      pollUntil(fn, () => false, { maxAttempts: 2, intervalMs: 750 }),
    ).rejects.toThrow('intervalMs=750');
  });

  it('error message includes elapsed time in milliseconds', async () => {
    const fn = vi.fn().mockResolvedValue('x');

    await expect(
      pollUntil(fn, () => false, { maxAttempts: 1, intervalMs: 0 }),
    ).rejects.toThrow(/\d+ms elapsed/);
  });

  it('includes context tag in error message when context is provided', async () => {
    const fn = vi.fn().mockResolvedValue('x');

    await expect(
      pollUntil(fn, () => false, { maxAttempts: 1, intervalMs: 0, context: 'worklogId=999' }),
    ).rejects.toThrow('[worklogId=999]');
  });

  it('does NOT include bracket tag in error message when context is omitted', async () => {
    const fn = vi.fn().mockResolvedValue('x');
    let caught: unknown;

    await pollUntil(fn, () => false, { maxAttempts: 1, intervalMs: 0 }).catch(e => {
      caught = e;
    });

    expect((caught as Error).message).not.toContain('[');
  });
});

describe('pollUntil — fn throwing propagates immediately', () => {
  it('propagates fn rejection on the first call', async () => {
    const boom = new Error('fetch exploded');
    const fn = vi.fn().mockRejectedValue(boom);

    await expect(pollUntil(fn, () => false, { maxAttempts: 5, intervalMs: 0 })).rejects.toBe(boom);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('propagates fn rejection on a middle call', async () => {
    const boom = new Error('mid-poll failure');
    const fn = vi.fn().mockResolvedValueOnce('pending').mockRejectedValueOnce(boom).mockResolvedValue('ok');

    await expect(pollUntil(fn, v => v === 'ok', { maxAttempts: 5, intervalMs: 0 })).rejects.toBe(boom);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('pollUntil — predicate throwing propagates immediately', () => {
  it('propagates predicate exception', async () => {
    const fn = vi.fn().mockResolvedValue({ data: null });
    const boom = new TypeError('cannot read property of null');

    await expect(
      pollUntil(fn, () => { throw boom; }, { maxAttempts: 5, intervalMs: 0 }),
    ).rejects.toBe(boom);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('pollUntil — interval timing (fake timers)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('waits intervalMs between each attempt', async () => {
    const fn = vi
      .fn()
      .mockResolvedValueOnce('not-yet')
      .mockResolvedValueOnce('not-yet')
      .mockResolvedValueOnce('done');

    const promise = pollUntil(fn, v => v === 'done', { maxAttempts: 5, intervalMs: 200 });

    // First call immediate, predicate false → sleep 200ms
    expect(fn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(199);
    expect(fn).toHaveBeenCalledTimes(1); // Not yet

    await vi.advanceTimersByTimeAsync(1);
    // Second call triggered
    expect(fn).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(200);
    // Third call triggered — predicate succeeds
    const result = await promise;
    expect(result).toBe('done');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('does NOT sleep after the final successful call', async () => {
    const fn = vi.fn().mockResolvedValueOnce('not-yet').mockResolvedValueOnce('done');
    const timerCallsBefore = vi.getTimerCount();

    const promise = pollUntil(fn, v => v === 'done', { maxAttempts: 3, intervalMs: 1000 });

    await vi.advanceTimersByTimeAsync(1000); // trigger second call
    const result = await promise;

    expect(result).toBe('done');
    // Only one sleep happened (between attempt 1 and 2); no sleep after the successful attempt
    expect(fn).toHaveBeenCalledTimes(2);
    void timerCallsBefore;
  });

  it('does NOT sleep after the last failed attempt (no trailing sleep before throw)', async () => {
    const fn = vi.fn().mockResolvedValue('never');

    const promise = pollUntil(fn, () => false, { maxAttempts: 2, intervalMs: 500 });
    // Pre-attach rejection handler before advancing time to prevent unhandled rejection warning.
    const rejectCheck = expect(promise).rejects.toThrow();

    // Advance past the first interval
    await vi.advanceTimersByTimeAsync(500);
    // maxAttempts=2: second call ran, predicate false, no more sleeps, throw
    await rejectCheck;
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
