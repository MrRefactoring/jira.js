import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of a custom option for a field. */

export const CustomFieldOptionSchema = apiObject({
  /** The URL of these custom field option details. */
  self: z.url().optional(),
  /** The value of the custom field option. */
  value: z.string().optional(),
});

export type CustomFieldOption = z.infer<typeof CustomFieldOptionSchema>;
