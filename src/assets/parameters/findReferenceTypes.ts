import { z } from 'zod';

export const FindReferenceTypesSchema = z.object({
  /**
   * Include reference types for the object schema id. If supplied reference types for the object schema will be
   * returned otherwise all global will be returned
   */
  objectSchemaId: z.string().optional(),
  /** Include all reference types. Defaults to false */
  includeAll: z.boolean().optional(),
});

export type FindReferenceTypes = z.input<typeof FindReferenceTypesSchema>;
