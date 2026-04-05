import { z } from 'zod';

/** The default value for a User Picker (multiple) custom field. */
export const CustomFieldContextDefaultValueMultiUserPickerSchema = z.object({
  /** The IDs of the default users. */
  accountIds: z.array(z.string()),
  /** The ID of the context. */
  contextId: z.string(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueMultiUserPicker = z.infer<
  typeof CustomFieldContextDefaultValueMultiUserPickerSchema
>;
