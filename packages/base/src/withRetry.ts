import { ApiError } from './apiError';

const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);

export interface RetryOptions {
  /** Total number of attempts including the first. Default: 3. */
  maxAttempts?: number;
  /** Delay before the first retry in milliseconds. Default: 1000. */
  initialDelayMs?: number;
  /** Exponential backoff multiplier. Default: 2. */
  backoffFactor?: number;
}

/**
 * Wraps an async operation with automatic retry on retriable HTTP errors.
 *
 * Retries only on: 429, 502, 503, 504. Never retries 401, 403, 404, 500,
 * or network TypeError.
 *
 * @stable
 *
 * @example
 * ```typescript
 * const issue = await withRetry(
 *   () => client.issues.getIssue({ issueIdOrKey: 'PROJ-1' }),
 *   { maxAttempts: 4, initialDelayMs: 500 },
 * );
 * ```
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { maxAttempts = 3, initialDelayMs = 1000, backoffFactor = 2 } = options;
  let lastError: unknown;
  let delayMs = initialDelayMs;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;

      const isRetryable = err instanceof ApiError && RETRYABLE_STATUS_CODES.has(err.status);

      if (!isRetryable || attempt === maxAttempts) {
        throw err;
      }

      await new Promise<void>(resolve => setTimeout(resolve, delayMs));
      delayMs = Math.round(delayMs * backoffFactor);
    }
  }

  throw lastError;
}
