import { z } from 'zod';

export const FindSchemaObjectTypesFlatSchema = z.object({
  /** The object schema id */
  id: z.string(),
  /** A case-insensitive query used to filter object types whose name or display name starts with the value */
  query: z.string().optional(),
  /** Exclude object types whose name or display name exactly matches this value, ignoring case */
  exclude: z.string().optional(),
  /** If true, the objectCount attribute is populated for each object type */
  includeObjectCounts: z.boolean().optional(),
});

export type FindSchemaObjectTypesFlat = z.input<typeof FindSchemaObjectTypesFlatSchema>;
