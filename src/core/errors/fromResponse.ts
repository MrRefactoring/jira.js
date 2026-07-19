import {
  ApiError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ScopeError,
  ServerError,
  type ApiErrorOptions,
} from './apiError.js';
import { NetworkError } from './networkError.js';
import { PRODUCT } from '../productInfo.js';

/** Node/undici error codes that signal a recoverable transport-layer failure. */
const TRANSIENT_NETWORK_CODES = new Set([
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'ENOTFOUND',
  'EAI_AGAIN',
  'EPIPE',
  'UND_ERR_SOCKET',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_HEADERS_TIMEOUT',
  'UND_ERR_BODY_TIMEOUT',
]);

/** HTTP statuses that signal a recoverable upstream failure. The single source of truth for both retry paths. */
export const TRANSIENT_HTTP_STATUSES = new Set([502, 503, 504]);

/**
 * The transport-level error code, dug out of the `cause` chain.
 *
 * `fetch` reports a failed request as `TypeError: fetch failed` and hides the reason underneath, sometimes more than
 * one level down, so the chain is walked rather than the top error inspected.
 */
function networkErrorCode(err: unknown): string | undefined {
  let cursor: unknown = err;

  for (let depth = 0; cursor instanceof Error && depth < 5; depth += 1) {
    const code = (cursor as Error & { code?: string }).code;

    if (code) return code;

    cursor = (cursor as { cause?: unknown }).cause;
  }

  return undefined;
}

/** Whether a transport failure is worth retrying. Broken TLS sessions (`ERR_SSL_*`) count. */
export function isTransientCode(code: string | undefined): boolean {
  if (!code) return false;

  return TRANSIENT_NETWORK_CODES.has(code) || code.startsWith('ERR_SSL_');
}

/** Wrap whatever `fetch` rejected with into a `NetworkError`, preserving the original as `cause`. */
export function toNetworkError(err: unknown, url: string): NetworkError {
  const code = networkErrorCode(err);
  const reason = err instanceof Error ? err.message : String(err);

  return new NetworkError(`Request to ${url} failed: ${reason}${code ? ` (${code})` : ''}`, {
    cause: err,
    code,
    transient: isTransientCode(code),
  });
}

/**
 * `Retry-After` in milliseconds. The header is either delta-seconds or an HTTP date; both are accepted, and anything
 * else is ignored rather than guessed at.
 */
export function parseRetryAfter(header: string | null, now = Date.now()): number | undefined {
  if (!header) return undefined;

  const seconds = Number(header);

  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);

  const date = Date.parse(header);

  if (Number.isNaN(date)) return undefined;

  return Math.max(0, date - now);
}

/**
 * Whether a 401 is really a missing scope.
 *
 * Confluence says so in the body — `{"code":401,"message":"Unauthorized; scope does not match"}` — and nowhere else,
 * so the message is the only signal there is. Matched loosely, since the wording is Atlassian's to change; a miss
 * only costs the caller a plain `AuthError`.
 */
function isScopeMismatch(body: unknown): boolean {
  const message = typeof body === 'object' && body !== null ? (body as { message?: unknown }).message : body;

  return typeof message === 'string' && /scope does not match/i.test(message);
}

/** Build the error class that matches the status, so callers can branch on the type instead of the number. */
export function createApiError(
  message: string,
  status: number,
  statusText: string,
  body: unknown,
  headers?: Headers,
  options?: ApiErrorOptions,
): ApiError {
  if (status === 401) {
    return isScopeMismatch(body)
      ? new ScopeError(
        `${message}\n\nThe token is missing a scope this endpoint requires. Refreshing will not help: add the ` +
            `scope in the developer console and have the user authorize again.${PRODUCT.scopeHint ? ` ${PRODUCT.scopeHint}` : ''}`,
        statusText,
        body,
        options,
      )
      : new AuthError(message, statusText, body, options);
  }

  if (status === 403) return new ForbiddenError(message, statusText, body, options);

  if (status === 404) return new NotFoundError(message, statusText, body, options);

  if (status === 429) {
    return new RateLimitError(message, statusText, body, {
      ...options,
      retryAfterMs: parseRetryAfter(headers?.get('retry-after') ?? null),
    });
  }

  if (status >= 500) return new ServerError(message, status, statusText, body, options);

  return new ApiError(message, status, statusText, body, options);
}
