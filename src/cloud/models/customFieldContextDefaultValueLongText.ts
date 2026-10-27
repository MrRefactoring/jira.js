import { z } from 'zod';
import { apiObject } from '#/core';

/** The default text for a plain text paragraph custom field. */
export const CustomFieldContextDefaultValueLongTextSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default text. Line breaks are preserved. The maximum length is the instance's text field character limit. */
  text: z.string().optional(),
  type: z.enum(['longtext']),
});

export type CustomFieldContextDefaultValueLongText = z.infer<typeof CustomFieldContextDefaultValueLongTextSchema>;
