import { z } from 'zod';
import { apiObject } from '#/core';
/** The default text for a text area custom field. */

export const CustomFieldContextDefaultValueTextAreaSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default text. The maximum length is 32767 characters. */
  text: z.string().optional(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueTextArea = z.infer<typeof CustomFieldContextDefaultValueTextAreaSchema>;
