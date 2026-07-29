import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a Forge object custom field. */

export const CustomFieldContextDefaultValueForgeObjectFieldSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default JSON object. */
  object: z.record(z.string(), z.any()).optional(),
  type: z.enum(['forge.object']),
});

export type CustomFieldContextDefaultValueForgeObjectField = z.infer<
  typeof CustomFieldContextDefaultValueForgeObjectFieldSchema
>;
