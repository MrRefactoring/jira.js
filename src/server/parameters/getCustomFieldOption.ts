import { z } from 'zod';

export const GetCustomFieldOptionSchema = z.object({
  /** A String containing an Custom Field Option id. */
  id: z.string(),
});

export type GetCustomFieldOption = z.input<typeof GetCustomFieldOptionSchema>;
