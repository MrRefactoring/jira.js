import { z } from 'zod';
import { isSchemaAuditEnabled } from './schemaAudit.js';

/**
 * Builds a schema for a string field whose documented values are a vendor's list rather than a real constraint.
 *
 * Open by default: any string is accepted, because the specification these schemas are generated from routinely falls
 * behind the API it describes. A value the vendor added and did not write down is not a bug in the caller's code, and
 * it must not turn into a warning in their logs.
 *
 * The documented values survive where they are actually useful — in the type. `z.infer` gives
 * `'software' | 'service_desk' | 'business' | (string & {})`, so an editor still suggests all three while the compiler
 * accepts whatever the API turns out to send. They also survive in the failure message, which names them.
 *
 * Under `AUDIT_SCHEMAS=true` it builds a real `z.enum` instead, which is how the audit run learns that a list has gone
 * stale. That is the run whose job is to compare the schemas against what the API sends; a caller's process is not.
 *
 * The declared return type stays the open one in both modes, deliberately — the same reason as in `apiObject`: the
 * switch is read at runtime, so the compiler cannot follow it, and the published declarations must not shift with an
 * environment variable.
 */
export function openEnum<const T extends readonly string[]>(values: T) {
  const documented = values.map(value => `'${value}'`).join(' | ');

  // `string & {}`, not `string`: a plain `string` in the union swallows the literals and takes the suggestions with them.
  const open = z.custom<T[number] | (string & {})>(value => typeof value === 'string', {
    message: `one of ${documented}, or another string`,
  });

  if (isSchemaAuditEnabled()) {
    return z.enum(values) as unknown as typeof open;
  }

  return open;
}
