import { ERROR_KINDS, hasErrorKind, type ErrorKind } from './kinds.js';

/**
 * The request succeeded, but the response cannot be validated against the endpoint's schema — Confluence answered 2xx
 * with something that is not JSON at all.
 *
 * Distinct from a `ZodError`, which means the JSON parsed but its shape drifted, and from an `ApiError`, which means
 * the request itself failed.
 *
 * @stable
 */
export class SchemaMismatchError extends Error {
  readonly [ERROR_KINDS]: readonly ErrorKind[] = ['schemaMismatch'];

  /** The raw response body, so you can see what arrived instead. */
  readonly body: string;

  constructor(message: string, body: string) {
    super(message);
    this.name = 'SchemaMismatchError';
    this.body = body;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'schemaMismatch');
  }
}
