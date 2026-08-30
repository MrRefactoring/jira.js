import { z } from 'zod';

export const GetSchemaAndMappingProgressSchema = z.object({
  /** The importSourceId of the import source configuration for the external import */
  importSourceId: z.string(),
  /** The resourceId references the running schema and mapping operation */
  resourceId: z.string(),
});

export type GetSchemaAndMappingProgress = z.input<typeof GetSchemaAndMappingProgressSchema>;
