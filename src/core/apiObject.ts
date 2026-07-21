import { z, type ZodRawShape } from 'zod';
import { isSchemaAuditEnabled } from './schemaAudit.js';

/**
 * Builds an object schema for an API response.
 *
 * Loose by default: keys the API sends but the spec does not document pass straight through, so a field added upstream
 * never breaks a consumer between releases.
 *
 * Under `AUDIT_SCHEMAS=true` it builds strict objects instead, which is how the audit run learns *where* an
 * undocumented key sits — zod reports `unrecognized_keys` with a path, and nothing else in the pipeline knows the
 * shape well enough to say. Those failures do not reach the caller: `createClient` records them and hands back the
 * response anyway, so one stale schema cannot cut the audit short. Loose validation cannot report drift at all, since
 * accepting anything extra is precisely what it is for.
 *
 * The declared return type stays the loose one in both modes, deliberately. The switch is read at runtime, so the
 * compiler cannot follow it, and the published declarations must not shift with an environment variable.
 */
export function apiObject<Shape extends ZodRawShape>(shape: Shape) {
  const loose = z.object(shape).loose();

  if (isSchemaAuditEnabled()) {
    return z.strictObject(shape) as unknown as typeof loose;
  }

  return loose;
}
