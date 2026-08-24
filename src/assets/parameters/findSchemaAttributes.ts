import { z } from 'zod';

export const FindSchemaAttributesSchema = z.object({
  /** Return only values that are associated with values that can be edited */
  onlyValueEditable: z.boolean().optional(),
  /** Include the object type with each object type attribute */
  extended: z.boolean().optional(),
  /** A query that will be used to filter object type attributes by their name */
  query: z.string().optional(),
  /** The object schema id */
  id: z.string(),
});

export type FindSchemaAttributes = z.input<typeof FindSchemaAttributesSchema>;
