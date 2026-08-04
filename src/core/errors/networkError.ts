import { ERROR_KINDS, hasErrorKind, type ErrorKind } from './kinds.js';

/**
 * The request never produced an HTTP response — DNS, TLS, a reset socket, a timeout, an unreachable host.
 *
 * `fetch` reports these as a bare `TypeError` whose real reason is buried in `cause`. Wrapping them means a caller can
 * catch every failure of this client uniformly, and `transient` says whether retrying stands a chance.
 *
 * @stable
 */
export class NetworkError extends Error {
  readonly [ERROR_KINDS]: readonly ErrorKind[] = ['network'];

  /** The underlying error code, e.g. `ECONNRESET`, when one was found. */
  readonly code?: string;
  /** Whether the failure looks retryable rather than permanent. */
  readonly transient: boolean;

  constructor(message: string, options: { cause: unknown; code?: string; transient: boolean }) {
    super(message, { cause: options.cause });
    this.name = 'NetworkError';
    this.code = options.code;
    this.transient = options.transient;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'network');
  }
}
