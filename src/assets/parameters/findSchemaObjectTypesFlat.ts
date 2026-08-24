import { z } from 'zod';

export const FindSchemaObjectTypesFlatSchema = z.object({
  /** The object schema id */
  id: z.string(),
  /** Object Type Names to search for */
  query: z.boolean().optional(),
  /** Exclude objects with this name */
  exclude: z.string().optional(),
  /** If true, the objectCount attribute is populated for each object type */
  includeObjectCounts: z.boolean().optional(),
});

export type FindSchemaObjectTypesFlat = z.input<typeof FindSchemaObjectTypesFlatSchema>;
