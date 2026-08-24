import { z } from 'zod';

export const FindSchemaObjectTypesSchema = z.object({
  /** The object schema id */
  id: z.string(),
  /** If true, filters out Abstract Object Types from the results */
  excludeAbstract: z.boolean().optional(),
});

export type FindSchemaObjectTypes = z.input<typeof FindSchemaObjectTypesSchema>;
