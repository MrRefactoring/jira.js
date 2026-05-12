import { ApiError } from '@jira.js/base';

const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);

export interface WithRetryOptions {
  maxAttempts?: number;
  baseIntervalMs?: number;
  context?: string;
}

/**
 * Retries an async operation when it fails with a retryable HTTP status (429, 502, 503, 504).
 * Uses exponential backoff between attempts.
 *
 * Fatal errors (auth failures, schema violations, permission denials, malformed responses)
 * are rethrown immediately without retry — retries must never hide real regressions.
 */
export async function withRetry<T>(fn: () => Promise<T>, options: WithRetryOptions = {}): Promise<T> {
  const { maxAttempts = 3, baseIntervalMs = 1000, context } = options;
  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      const isRetryable = error instanceof ApiError && RETRYABLE_STATUS_CODES.has(error.status);

      if (!isRetryable) throw error;

      if (attempt < maxAttempts - 1) {
        const waitMs = baseIntervalMs * 2 ** attempt;
        await new Promise<void>(resolve => setTimeout(resolve, waitMs));
      }
    }
  }

  const tag = context ? ` [${context}]` : '';
  throw new Error(
    `withRetry${tag}: all ${maxAttempts} attempts failed. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
  );
}
