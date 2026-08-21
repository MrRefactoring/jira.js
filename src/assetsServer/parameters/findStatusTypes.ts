import { z } from 'zod';

export const FindStatusTypesSchema = z.object({
  /**
   * Include statuses for the object schema ID. If this parameter is supplied, statuses for the given object schema will
   * be returned. Otherwise all global statuses will be returned.
   */
  objectSchemaId: z.string().optional(),
});

export type FindStatusTypes = z.input<typeof FindStatusTypesSchema>;
