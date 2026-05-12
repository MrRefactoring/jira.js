import { z } from 'zod';

/** The default value for a multi-select custom field. */
export const CustomFieldContextDefaultValueMultipleOptionSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The list of IDs of the default options. */
  optionIds: z.array(z.string()),
  type: z.string(),
});

export type CustomFieldContextDefaultValueMultipleOption = z.infer<
  typeof CustomFieldContextDefaultValueMultipleOptionSchema
>;
