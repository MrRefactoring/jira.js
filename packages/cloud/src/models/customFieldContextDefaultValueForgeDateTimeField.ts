import { z } from 'zod';

/** The default value for a Forge date time custom field. */
export const CustomFieldContextDefaultValueForgeDateTimeFieldSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default date-time in ISO format. Ignored if `useCurrent` is true. */
  dateTime: z.string().optional(),
  type: z.string(),
  /** Whether to use the current date. */
  useCurrent: z.boolean().optional(),
});

export type CustomFieldContextDefaultValueForgeDateTimeField = z.infer<
  typeof CustomFieldContextDefaultValueForgeDateTimeFieldSchema
>;
