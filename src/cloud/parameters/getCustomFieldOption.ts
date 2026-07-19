import { z } from 'zod';

export const GetCustomFieldOptionSchema = z.object({
  /** The ID of the custom field option. */
  id: z.string(),
});

export type GetCustomFieldOption = z.input<typeof GetCustomFieldOptionSchema>;
