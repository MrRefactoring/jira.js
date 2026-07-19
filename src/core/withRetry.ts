import { isApiError, isNetworkError, isRateLimitError, TRANSIENT_HTTP_STATUSES } from './errors/index.js';

export interface RetryOptions {
  /** Total number of attempts including the first. Default: 3. */
  maxAttempts?: number;
  /** Delay before the first retry in milliseconds. Default: 1000. */
  initialDelayMs?: number;
  /** Exponential backoff multiplier. Default: 2. */
  backoffFactor?: number;
  /**
   * Also retry a 429, waiting out `Retry-After` when Confluence sent one. Off by default: a rate limit asks you to slow
   * the whole client down, and retrying one call in place papers over that.
   */
  retryRateLimit?: boolean;
}

/**
 * Wraps an async operation with automatic retry on failures worth retrying.
 *
 * Retries a transient transport failure and a 502/503/504 gateway error — the same policy the client applies to its own
 * requests, so wrapping a call does not change which failures count as temporary. Everything else is rethrown on the
 * first attempt: 401, 403, 404 and 500 describe the request, not the moment. A 429 joins the list only under
 * `retryRateLimit`, and then honours `Retry-After`.
 *
 * It is therefore a transient-failure helper, not a poller — to wait on eventually-consistent state, loop on the value
 * rather than on a thrown error.
 *
 * @example
 *   ```typescript
 *   const page = await withRetry(
 *     () => confluence.page.getPageById({ id: 12345 }),
 *     { maxAttempts: 4, initialDelayMs: 500 },
 *   );
 *   ```;
 *
 * @stable
 */
export async function withRetry<T>(operation: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { maxAttempts = 3, initialDelayMs = 1000, backoffFactor = 2, retryRateLimit = false } = options;
  let lastError: unknown;
  let delayMs = initialDelayMs;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;

      const rateLimited = retryRateLimit && isRateLimitError(err);
      const isRetryable =
        rateLimited ||
        (isNetworkError(err) && err.transient) ||
        (isApiError(err) && TRANSIENT_HTTP_STATUSES.has(err.status));

      if (!isRetryable || attempt === maxAttempts) {
        throw err;
      }

      // Atlassian's own advice beats the backoff curve whenever it gave any.
      const waitMs = (isRateLimitError(err) ? err.retryAfterMs : undefined) ?? delayMs;

      await new Promise<void>(resolve => setTimeout(resolve, waitMs));
      delayMs = Math.round(delayMs * backoffFactor);
    }
  }

  throw lastError;
}
