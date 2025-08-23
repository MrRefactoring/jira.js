import { z } from 'zod';

/** The default value for a single select custom field. */
export const CustomFieldContextDefaultValueSingleOptionSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The ID of the default option. */
  optionId: z.string(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueSingleOption = z.infer<
  typeof CustomFieldContextDefaultValueSingleOptionSchema
>;
