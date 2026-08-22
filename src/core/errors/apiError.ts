import { ERROR_KINDS, hasErrorKind, type ErrorKind } from './kinds.js';

export interface ApiErrorOptions {
  /** The error that caused this one — a transport failure, a parse failure. */
  cause?: unknown;
}

/**
 * Thrown when the API returns a non-2xx HTTP response.
 *
 * The subclasses below cover the statuses worth branching on. Catch this one to catch them all, or a subclass — or use
 * the predicates, which survive a duplicated install of this package.
 *
 * @public
 */
export class ApiError extends Error {
  readonly [ERROR_KINDS]: readonly ErrorKind[] = ['api'];

  /** HTTP status. */
  readonly status: number;
  readonly statusText: string;
  /** Atlassian's error payload, parsed when it was JSON and the raw text when it was not. */
  readonly body: unknown;

  constructor(message: string, status: number, statusText: string, body: unknown, options?: ApiErrorOptions) {
    super(message, options);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.body = body;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'api');
  }
}

export interface AuthErrorOptions extends ApiErrorOptions {
  /**
   * The status the response actually carried. Defaults to 401.
   *
   * Overridden where the credentials were refused behind a status that says otherwise: an endpoint permitting
   * anonymous access answers `200` with an anonymous-scope body and reports the refusal in `X-Seraph-LoginReason`.
   * Recording 401 there would name a status that never crossed the wire.
   */
  status?: number;
}

/**
 * The credentials are missing, expired or rejected.
 *
 * Usually a 401. Not always: see {@link AuthErrorOptions.status}.
 *
 * @public
 */
export class AuthError extends ApiError {
  override readonly [ERROR_KINDS]: readonly ErrorKind[] = ['api', 'auth'];

  constructor(message: string, statusText: string, body: unknown, options?: AuthErrorOptions) {
    super(message, options?.status ?? 401, statusText, body, options);
    this.name = 'AuthError';
  }

  static override [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'auth');
  }
}

/**
 * 401 with `Unauthorized; scope does not match` — the token is valid, but the app never asked for a scope this endpoint
 * needs.
 *
 * A subclass of {@link AuthError} because it is still a 401, but worth its own type: refreshing the token cannot fix it,
 * so the client does not try. The app needs the scope added in the developer console and the user has to consent
 * again.
 *
 * Which scope is missing is the operation's own business, and its API documentation names it. `PRODUCT.scopeHint`
 * carries whatever else is worth saying for this product, and the thrown message repeats it.
 *
 * @public
 */
export class ScopeError extends AuthError {
  override readonly [ERROR_KINDS]: readonly ErrorKind[] = ['api', 'auth', 'scope'];

  constructor(message: string, statusText: string, body: unknown, options?: ApiErrorOptions) {
    super(message, statusText, body, options);
    this.name = 'ScopeError';
  }

  static override [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'scope');
  }
}

/**
 * 403 — authenticated, but not allowed. Usually a product permission rather than a scope.
 *
 * @public
 */
export class ForbiddenError extends ApiError {
  override readonly [ERROR_KINDS]: readonly ErrorKind[] = ['api', 'forbidden'];

  constructor(message: string, statusText: string, body: unknown, options?: ApiErrorOptions) {
    super(message, 403, statusText, body, options);
    this.name = 'ForbiddenError';
  }

  static override [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'forbidden');
  }
}

/**
 * 404 — no such thing, or no permission to know it exists.
 *
 * The API returns 404 for both, deliberately: telling the two apart would leak the existence of restricted content.
 *
 * @public
 */
export class NotFoundError extends ApiError {
  override readonly [ERROR_KINDS]: readonly ErrorKind[] = ['api', 'notFound'];

  constructor(message: string, statusText: string, body: unknown, options?: ApiErrorOptions) {
    super(message, 404, statusText, body, options);
    this.name = 'NotFoundError';
  }

  static override [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'notFound');
  }
}

export interface RateLimitErrorOptions extends ApiErrorOptions {
  /** How long to wait before retrying, in ms, when the API said so. */
  retryAfterMs?: number;
}

/**
 * 429 — you are being rate limited.
 *
 * `retryAfterMs` carries Atlassian's own advice when the response included `Retry-After`. It is not retried for you:
 * the right response to a rate limit is to slow the whole client down, which only your code can decide.
 *
 * @public
 */
export class RateLimitError extends ApiError {
  override readonly [ERROR_KINDS]: readonly ErrorKind[] = ['api', 'rateLimit'];

  /** Milliseconds to wait, from the `Retry-After` header. Undefined when the response did not say. */
  readonly retryAfterMs?: number;

  constructor(message: string, statusText: string, body: unknown, options?: RateLimitErrorOptions) {
    super(message, 429, statusText, body, options);
    this.name = 'RateLimitError';
    this.retryAfterMs = options?.retryAfterMs;
  }

  static override [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'rateLimit');
  }
}

/**
 * 5xx — the API failed on its own side.
 *
 * @public
 */
export class ServerError extends ApiError {
  override readonly [ERROR_KINDS]: readonly ErrorKind[] = ['api', 'server'];

  constructor(message: string, status: number, statusText: string, body: unknown, options?: ApiErrorOptions) {
    super(message, status, statusText, body, options);
    this.name = 'ServerError';
  }

  static override [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'server');
  }
}
