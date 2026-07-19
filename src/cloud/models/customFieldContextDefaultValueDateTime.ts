import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a date time custom field. */

export const CustomFieldContextDefaultValueDateTimeSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default date-time in ISO format. Ignored if `useCurrent` is true. */
  dateTime: z.string().optional(),
  type: z.string(),
  /** Whether to use the current date. */
  useCurrent: z.boolean().optional(),
});

export type CustomFieldContextDefaultValueDateTime = z.infer<typeof CustomFieldContextDefaultValueDateTimeSchema>;
