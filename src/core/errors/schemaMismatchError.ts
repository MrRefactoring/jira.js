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
 * `report` names paths and types and never the values at them. The previous version of this error carried the entire
 * response body, which put issue summaries, display names and custom field contents into every log line and error
 * tracker that saw it — a schema bug turning into someone else's data incident.
 *
 * Distinct from `ApiError`, which means the request itself failed.
 *
 * @stable
 */
export class SchemaMismatchError extends Error {
  readonly [ERROR_KINDS]: readonly ErrorKind[] = ['schemaMismatch'];

  /** Which fields disagreed with the schema, by path and type. Paste-able into a bug report. */
  readonly report: SchemaMismatchReport;

  constructor(message: string, report: SchemaMismatchReport, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'SchemaMismatchError';
    this.report = report;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static [Symbol.hasInstance](value: unknown): boolean {
    return hasErrorKind(value, 'schemaMismatch');
  }
}
