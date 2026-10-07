import { z } from 'zod';
import { apiObject } from '#/core';

/** Object schema and mapping configuration for an external import. */
export const ImportSchemaAndMappingSchema = apiObject({
  /**
   * Object schema and status schema configuration for the import. Object types, child object types, attributes, and
   * statuses support an optional `displayName`; reference attributes support an optional `referenceTypeDisplayName`.
   */
  schema: z.record(z.string(), z.any()).optional(),
  /** Object type and attribute mapping configuration for the import. */
  mapping: z.record(z.string(), z.any()).optional(),
});

export type ImportSchemaAndMapping = z.infer<typeof ImportSchemaAndMappingSchema>;
