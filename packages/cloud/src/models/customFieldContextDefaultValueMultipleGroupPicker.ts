import { z } from 'zod';

/** The default value for a multiple group picker custom field. */
export const CustomFieldContextDefaultValueMultipleGroupPickerSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The IDs of the default groups. */
  groupIds: z.array(z.string()),
  type: z.string(),
});

export type CustomFieldContextDefaultValueMultipleGroupPicker = z.infer<
  typeof CustomFieldContextDefaultValueMultipleGroupPickerSchema
>;
