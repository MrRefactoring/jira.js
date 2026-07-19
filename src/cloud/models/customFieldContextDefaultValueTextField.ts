import { z } from 'zod';
import { apiObject } from '#/core';
/** The default text for a text custom field. */

export const CustomFieldContextDefaultValueTextFieldSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default text. The maximum length is 254 characters. */
  text: z.string().optional(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueTextField = z.infer<typeof CustomFieldContextDefaultValueTextFieldSchema>;
