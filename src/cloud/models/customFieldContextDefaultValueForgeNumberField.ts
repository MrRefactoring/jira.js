import { z } from 'zod';
import { apiObject } from '#/core';
/** Default value for a Forge number custom field. */

export const CustomFieldContextDefaultValueForgeNumberFieldSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default floating-point number. */
  number: z.number(),
  type: z.enum(['forge.number']),
});

export type CustomFieldContextDefaultValueForgeNumberField = z.infer<
  typeof CustomFieldContextDefaultValueForgeNumberFieldSchema
>;
