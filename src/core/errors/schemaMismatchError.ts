import { ERROR_KINDS, hasErrorKind, type ErrorKind } from './kinds.js';
import type { SchemaMismatchReport } from '../schemaMismatch.js';

/**
 * The request succeeded, but the response is not what the endpoint's schema describes.
 *
 * Covers both ways that can happen: the response was not JSON at all, or it parsed as JSON and its shape had drifted.
 * The two are told apart by `cause` — a validation failure carries the underlying `ZodError`, a non-JSON response
 * carries nothing — while `report` says which fields disagreed either way.
 *
 * They are one error rather than two on purpose: from a caller's side both mean "the API answered 2xx and the value
 * cannot be trusted", and nobody should have to know which validator this library uses in order to catch that.
 *
 * `report` names paths and types and never the values at them. Products preserving the legacy contract also retain
 * the raw response in `body`; other products leave it empty. The string constructor retains a supplied legacy body.
 *
 * Distinct from `ApiError`, which means the request itself failed.
 *
 * @public
 */
export class SchemaMismatchError extends Error {
  readonly [ERROR_KINDS]: readonly ErrorKind[] = ['schemaMismatch'];

  /** Which fields disagreed with the schema, by path and type. Paste-able into a bug report. */
  readonly report: SchemaMismatchReport;
  readonly body: string;

  constructor(message: string, report: SchemaMismatchReport | string, options?: { cause?: unknown; body?: string }) {
    super(message, options);
    this.name = 'SchemaMismatchError';
    this.report = typeof report === 'string' ? { endpoint: '', issues: [] } : report;
    this.body = typeof report === 'string' ? report : options?.body ?? '';
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'schemaMismatch');
  }
}
