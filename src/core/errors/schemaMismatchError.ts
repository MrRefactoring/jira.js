import { ERROR_KINDS, hasErrorKind, type ErrorKind } from './kinds.js';

/**
 * The request succeeded, but the response is not what the endpoint's schema describes.
 *
 * Covers both ways that can happen: the response was not JSON at all, or it parsed as JSON and its shape had drifted.
 * The two are told apart by `cause` — a validation failure carries the underlying `ZodError`, a non-JSON response
 * carries nothing — while `body` holds what actually arrived either way.
 *
 * They are one error rather than two on purpose: from a caller's side both mean "the API answered 2xx and the value
 * cannot be trusted", and nobody should have to know which validator this library uses in order to catch that.
 *
 * Distinct from `ApiError`, which means the request itself failed.
 *
 * @stable
 */
export class SchemaMismatchError extends Error {
  readonly [ERROR_KINDS]: readonly ErrorKind[] = ['schemaMismatch'];

  /** The raw response body, so you can see what arrived instead. */
  readonly body: string;

  constructor(message: string, body: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'SchemaMismatchError';
    this.body = body;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'schemaMismatch');
  }
}
