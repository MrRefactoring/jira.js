import { z, type ZodRawShape } from 'zod';
import { isSchemaAuditEnabled } from './schemaAudit.js';

export type ApiObjectConfig<Prefix extends string | undefined = undefined> = {
  out: z.core.$loose['out'];
  in: Prefix extends string ? { [Key in `${Prefix}${string}`]: unknown } : z.core.$strip['in'];
};

/**
 * Builds an object schema for an API response.
 *
 * Loose by default: keys the API sends but the spec does not document pass straight through, so a field added upstream
 * never breaks a consumer between releases.
 *
 * Under `AUDIT_SCHEMAS=true` it builds strict objects instead, which is how the audit run learns _where_ an
 * undocumented key sits — zod reports `unrecognized_keys` with a path, and nothing else in the pipeline knows the shape
 * well enough to say. Those failures do not reach the caller: `createClient` records them and hands back the response
 * anyway, so one stale schema cannot cut the audit short. Loose validation cannot report drift at all, since accepting
 * anything extra is precisely what it is for.
 *
 * The declared type is loose on the way out and exact on the way in: a model read from a response keeps the keys it
 * does not describe, while a model written into a request names only its own, so a misspelt key is a compile error. It
 * stays that in both modes, deliberately. The switch is read at runtime, so the compiler cannot follow it, and the
 * published declarations must not shift with an environment variable.
 */
export function apiObject<Shape extends ZodRawShape, Prefix extends string | undefined = undefined>(
  shape: Shape,
  additionalKeyPrefix?: Prefix,
): z.ZodObject<Shape, ApiObjectConfig<Prefix>> {
  const loose = z.object(shape).loose() as unknown as z.ZodObject<Shape, ApiObjectConfig<Prefix>>;

  if (!isSchemaAuditEnabled()) {
    return loose;
  }

  if (additionalKeyPrefix === undefined) {
    return z.strictObject(shape) as unknown as typeof loose;
  }

  return loose.superRefine(
    (value, context) => {
      const keys = Object.keys(value).filter(key => !Object.hasOwn(shape, key) && !key.startsWith(additionalKeyPrefix));

      if (keys.length > 0) {
        context.addIssue({ code: 'unrecognized_keys', keys, input: value });
      }
    },
    { when: payload => typeof payload.value === 'object' && payload.value !== null },
  );
}
