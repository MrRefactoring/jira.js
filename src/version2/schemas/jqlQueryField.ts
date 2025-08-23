import { z } from 'zod';
import { JqlQueryFieldEntityPropertySchema } from './jqlQueryFieldEntityProperty';

/**
 * A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ)
 * for more information about fields in JQL queries.
 */
export const JqlQueryFieldSchema = z.object({
  /** The encoded name of the field, which can be used directly in a JQL query. */
  encodedName: z.string().optional(),
  /** The name of the field. */
  name: z.string(),
  /** When the field refers to a value in an entity property, details of the entity property value. */
  property: z.array(JqlQueryFieldEntityPropertySchema).optional(),
});

export type JqlQueryField = z.infer<typeof JqlQueryFieldSchema>;
