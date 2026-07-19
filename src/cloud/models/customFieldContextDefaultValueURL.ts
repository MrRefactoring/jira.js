import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a URL custom field. */

export const CustomFieldContextDefaultValueURLSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  type: z.string(),
  /** The default URL. */
  url: z.string(),
});

export type CustomFieldContextDefaultValueURL = z.infer<typeof CustomFieldContextDefaultValueURLSchema>;
