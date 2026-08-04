import type {
  ApiError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ScopeError,
  ServerError,
} from './apiError.js';
import type { ConfigError, OAuthError } from './oauthError.js';
import type { NetworkError } from './networkError.js';
import type { SchemaMismatchError } from './schemaMismatchError.js';
import { hasErrorKind } from './kinds.js';

/**
 * Any non-2xx response from Confluence, including every subclass.
 *
 * Prefer these predicates to `instanceof` in library code and in anything that might load two copies of this package:
 * they check a branded marker instead of the prototype chain.
 *
 * @stable
 */
export function isApiError(value: unknown): value is ApiError {
  return hasErrorKind(value, 'api');
}

/**
 * 401 — credentials missing, expired or rejected.
 *
 * @stable
 */
export function isAuthError(value: unknown): value is AuthError {
  return hasErrorKind(value, 'auth');
}

/**
 * 403 — authenticated but not permitted.
 *
 * @stable
 */
export function isForbiddenError(value: unknown): value is ForbiddenError {
  return hasErrorKind(value, 'forbidden');
}

/**
 * 404 — absent, or invisible to you.
 *
 * @stable
 */
export function isNotFoundError(value: unknown): value is NotFoundError {
  return hasErrorKind(value, 'notFound');
}

/**
 * 429 — rate limited. Read `retryAfterMs` for Atlassian's own advice.
 *
 * @stable
 */
export function isRateLimitError(value: unknown): value is RateLimitError {
  return hasErrorKind(value, 'rateLimit');
}

/**
 * 5xx — Confluence failed on its side.
 *
 * @stable
 */
export function isServerError(value: unknown): value is ServerError {
  return hasErrorKind(value, 'server');
}

/**
 * No HTTP response at all — DNS, TLS, socket, timeout.
 *
 * @stable
 */
export function isNetworkError(value: unknown): value is NetworkError {
  return hasErrorKind(value, 'network');
}

/**
 * An OAuth 2.0 failure: token exchange, refresh, or cloud-id resolution.
 *
 * @stable
 */
export function isOAuthError(value: unknown): value is OAuthError {
  return hasErrorKind(value, 'oauth');
}

/**
 * The client configuration cannot work.
 *
 * @stable
 */
export function isConfigError(value: unknown): value is ConfigError {
  return hasErrorKind(value, 'config');
}

/**
 * A 2xx response that is not JSON where the endpoint promised JSON.
 *
 * @stable
 */
export function isSchemaMismatchError(value: unknown): value is SchemaMismatchError {
  return hasErrorKind(value, 'schemaMismatch');
}

/**
 * The grant is gone: no refresh will fix it, and the user has to authorize again.
 *
 * Covers a refresh token that expired after 90 days idle, one rotated out because the new one was never persisted, a
 * user who changed their Atlassian password, and a user who declined the consent screen.
 *
 * Deliberately narrower than "any OAuth failure". A wrong client secret also fails the token endpoint — with
 * `access_denied`, the same code a declining user produces — and sending people through consent over a bad environment
 * variable would loop them forever. That case answers `false` here and surfaces as a plain {@link isOAuthError}.
 *
 * @stable
 */
export function isReauthorizationRequired(value: unknown): value is OAuthError {
  return isOAuthError(value) && value.reauthorizationRequired;
}

/**
 * The token is valid but lacks a scope this endpoint requires.
 *
 * Distinct from {@link isAuthError} because the remedy is different: refreshing cannot help, the app needs the scope
 * added and the user has to consent again. Confluence reports it as a 401 with `Unauthorized; scope does not match`.
 *
 * @stable
 */
export function isScopeError(value: unknown): value is ScopeError {
  return hasErrorKind(value, 'scope');
}
