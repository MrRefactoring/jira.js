import { z } from 'zod';
import { apiObject } from '#/core';
/** The default text for a Forge string custom field. */

export const CustomFieldContextDefaultValueForgeStringFieldSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default text. The maximum length is 254 characters. */
  text: z.string().optional(),
  type: z.enum(['forge.string']),
});

export type CustomFieldContextDefaultValueForgeStringField = z.infer<
  typeof CustomFieldContextDefaultValueForgeStringFieldSchema
>;
