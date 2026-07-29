import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a single select custom field. */

export const CustomFieldContextDefaultValueSingleOptionSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The ID of the default option. */
  optionId: z.string(),
  type: z.enum(['option.single']),
});

export type CustomFieldContextDefaultValueSingleOption = z.infer<
  typeof CustomFieldContextDefaultValueSingleOptionSchema
>;
