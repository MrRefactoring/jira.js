import { z } from 'zod';

/** Details of a custom option for a field. */
export const CustomFieldOptionSchema = z.object({
  /** The URL of these custom field option details. */
  self: z.string().optional(),
  /** The value of the custom field option. */
  value: z.string().optional(),
});

export type CustomFieldOption = z.infer<typeof CustomFieldOptionSchema>;
