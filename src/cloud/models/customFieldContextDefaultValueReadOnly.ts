import { z } from 'zod';
import { apiObject } from '#/core';
/** The default text for a read only custom field. */

export const CustomFieldContextDefaultValueReadOnlySchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default text. The maximum length is 255 characters. */
  text: z.string().optional(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueReadOnly = z.infer<typeof CustomFieldContextDefaultValueReadOnlySchema>;
