import { z } from 'zod';
import { ImportSchemaAndMappingSchema } from '../models';

export const UpdateSchemaAndMappingSchema = z.object(ImportSchemaAndMappingSchema.shape).extend({
  /** The uuid of the import source configuration for the external import */
  importSourceId: z.string(),
  /** Execute the operation asynchronously */
  async: z.boolean().optional(),
});

export type UpdateSchemaAndMapping = z.input<typeof UpdateSchemaAndMappingSchema>;
