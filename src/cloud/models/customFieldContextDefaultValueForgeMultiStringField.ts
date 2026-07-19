import { z } from 'zod';
import { apiObject } from '#/core';
/** The default text for a Forge collection of strings custom field. */

export const CustomFieldContextDefaultValueForgeMultiStringFieldSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  type: z.string(),
  /** List of string values. The maximum length for a value is 254 characters. */
  values: z.array(z.string()).optional(),
});

export type CustomFieldContextDefaultValueForgeMultiStringField = z.infer<
  typeof CustomFieldContextDefaultValueForgeMultiStringFieldSchema
>;
