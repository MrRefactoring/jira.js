import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of a custom field option for a context. */

export const CustomFieldOptionUpdateSchema = apiObject({
  /** Whether the option is disabled. */
  disabled: z.boolean().optional(),
  /** The ID of the custom field option. */
  id: z.string(),
  /** The value of the custom field option. */
  value: z.string().optional(),
});

export type CustomFieldOptionUpdate = z.infer<typeof CustomFieldOptionUpdateSchema>;
