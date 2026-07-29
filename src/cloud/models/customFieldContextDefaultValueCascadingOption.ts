import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a cascading select custom field. */

export const CustomFieldContextDefaultValueCascadingOptionSchema = apiObject({
  /** The ID of the default cascading option. */
  cascadingOptionId: z.string().optional(),
  /** The ID of the context. */
  contextId: z.string(),
  /** The ID of the default option. */
  optionId: z.string(),
  type: z.enum(['option.cascading']),
});

export type CustomFieldContextDefaultValueCascadingOption = z.infer<
  typeof CustomFieldContextDefaultValueCascadingOptionSchema
>;
