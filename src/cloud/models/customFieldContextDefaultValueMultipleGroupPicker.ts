import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a multiple group picker custom field. */

export const CustomFieldContextDefaultValueMultipleGroupPickerSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The IDs of the default groups. */
  groupIds: z.array(z.string()),
  type: z.enum(['grouppicker.multiple']),
});

export type CustomFieldContextDefaultValueMultipleGroupPicker = z.infer<
  typeof CustomFieldContextDefaultValueMultipleGroupPickerSchema
>;
