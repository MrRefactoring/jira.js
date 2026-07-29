import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a Date custom field. */

export const CustomFieldContextDefaultValueDateSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default date in ISO format. Ignored if `useCurrent` is true. */
  date: z.string().optional(),
  type: z.enum(['datepicker']),
  /** Whether to use the current date. */
  useCurrent: z.boolean().optional(),
});

export type CustomFieldContextDefaultValueDate = z.infer<typeof CustomFieldContextDefaultValueDateSchema>;
