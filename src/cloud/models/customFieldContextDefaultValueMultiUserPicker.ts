import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a User Picker (multiple) custom field. */

export const CustomFieldContextDefaultValueMultiUserPickerSchema = apiObject({
  /** The IDs of the default users. */
  accountIds: z.array(z.string()),
  /** The ID of the context. */
  contextId: z.string(),
  type: z.enum(['multi.user.select']),
});

export type CustomFieldContextDefaultValueMultiUserPicker = z.infer<
  typeof CustomFieldContextDefaultValueMultiUserPickerSchema
>;
