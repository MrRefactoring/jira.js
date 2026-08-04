import { z } from 'zod';
import { apiObject } from '#/core';
/** Default value for a float (number) custom field. */

export const CustomFieldContextDefaultValueFloatSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The default floating-point number. */
  number: z.number(),
  type: z.enum(['float']),
});

export type CustomFieldContextDefaultValueFloat = z.infer<typeof CustomFieldContextDefaultValueFloatSchema>;
