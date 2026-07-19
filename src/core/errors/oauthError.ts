import { ERROR_KINDS, hasErrorKind, type ErrorKind } from './kinds.js';

export interface OAuthErrorOptions {
  cause?: unknown;
  /** HTTP status, when the failure came from Atlassian's auth endpoints rather than from your configuration. */
  status?: number;
  /** The auth server's response body, parsed when it was JSON. */
  body?: unknown;
  /** The OAuth 2.0 error code, e.g. `invalid_grant`. */
  error?: string;
  /** The auth server's human-readable explanation. */
  errorDescription?: string;
  /**
   * Whether the grant is unrecoverable and the user has to authorize again.
   *
   * Set explicitly where the code alone cannot say. Atlassian answers `access_denied` both when the user declines the
   * consent screen — re-authorizing is exactly right — and when the client secret is wrong, where re-authorizing would
   * loop the user forever over what is really a deployment mistake.
   */
  reauthorizationRequired?: boolean;
}

/** The OAuth 2.0 `{ error, error_description }` pair, when the body carried one. */
function readErrorFields(body: unknown): { error?: string; errorDescription?: string } {
  if (typeof body !== 'object' || body === null) return {};

  const { error, error_description: description } = body as { error?: unknown; error_description?: unknown };

  return {
    error: typeof error === 'string' ? error : undefined,
    errorDescription: typeof description === 'string' ? description : undefined,
  };
}

/**
 * An OAuth 2.0 failure: the token endpoint rejected the request, or the client cannot proceed with what it was given.
 *
 * Deliberately not an `ApiError`: it does not come from the Confluence API, and a caller retrying Confluence calls
 * should not treat "your refresh token is dead" as the same class of problem as "that page is missing".
 *
 * @stable
 */
export class OAuthError extends Error {
  readonly [ERROR_KINDS]: readonly ErrorKind[] = ['oauth'];

  readonly status?: number;
  readonly body?: unknown;
  /**
   * The OAuth 2.0 error code from the auth server, e.g. `invalid_grant` or `access_denied`.
   *
   * Branch on this rather than on `status`: the code names what went wrong, while the status Atlassian pairs it with is
   * an implementation detail that has changed before.
   */
  readonly error?: string;
  readonly errorDescription?: string;
  /** Whether the only way forward is a fresh authorization. Read it through {@link isReauthorizationRequired}. */
  readonly reauthorizationRequired: boolean;

  constructor(message: string, options?: OAuthErrorOptions) {
    super(message, { cause: options?.cause });

    const fromBody = readErrorFields(options?.body);

    this.name = 'OAuthError';
    this.status = options?.status;
    this.body = options?.body;
    this.error = options?.error ?? fromBody.error;
    this.errorDescription = options?.errorDescription ?? fromBody.errorDescription;
    // `invalid_grant` is what Atlassian documents for a rotated-out or expired
    // token; `unauthorized_client` is what it actually sends when the refresh
    // token is unknown. Both mean the stored grant is dead. `access_denied` is
    // deliberately absent — from the token endpoint it means a bad client secret.
    this.reauthorizationRequired =
      options?.reauthorizationRequired ?? (this.error === 'invalid_grant' || this.error === 'unauthorized_client');
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'oauth');
  }
}

/**
 * The client was configured in a way that cannot work — contradictory options, or a required one missing.
 *
 * Thrown at construction time where possible, so a mistake surfaces before the first request rather than as a puzzling
 * 401.
 *
 * @stable
 */
export class ConfigError extends Error {
  readonly [ERROR_KINDS]: readonly ErrorKind[] = ['config'];

  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'ConfigError';
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'config');
  }
}
