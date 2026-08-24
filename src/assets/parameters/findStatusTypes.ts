import { z } from 'zod';

export const FindStatusTypesSchema = z.object({
  /**
   * Include statuses for the object schema id. If supplied statuses for the object schema will be returned otherwise
   * all global will be returned
   */
  objectSchemaId: z.string().optional(),
});

export type FindStatusTypes = z.input<typeof FindStatusTypesSchema>;
