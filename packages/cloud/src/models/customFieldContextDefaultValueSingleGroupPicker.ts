import { z } from 'zod';

/** The default value for a group picker custom field. */
export const CustomFieldContextDefaultValueSingleGroupPickerSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The ID of the the default group. */
  groupId: z.string(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueSingleGroupPicker = z.infer<
  typeof CustomFieldContextDefaultValueSingleGroupPickerSchema
>;
