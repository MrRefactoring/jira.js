import { z } from 'zod';

export const GetSchemaAndMappingSchema = z.object({
  /** The importSourceId of the import source configuration. For use with external imports only */
  importSourceId: z.string(),
});

export type GetSchemaAndMapping = z.input<typeof GetSchemaAndMappingSchema>;
