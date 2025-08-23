import { z } from 'zod';

export const GetCustomFieldResponseSchema = z.object({
  /** The custom field ID. */
  customFieldId: z.number().int(),
  /** Allows filtering issues based on their values for the custom field. */
  filter: z.boolean().optional(),
});

export type GetCustomFieldResponse = z.infer<typeof GetCustomFieldResponseSchema>;
