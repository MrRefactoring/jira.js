import { z } from 'zod';

/** The default value for a cascading select custom field. */
export const CustomFieldContextDefaultValueCascadingOptionSchema = z.object({
  /** The ID of the default cascading option. */
  cascadingOptionId: z.string().optional(),
  /** The ID of the context. */
  contextId: z.string(),
  /** The ID of the default option. */
  optionId: z.string(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueCascadingOption = z.infer<
  typeof CustomFieldContextDefaultValueCascadingOptionSchema
>;
