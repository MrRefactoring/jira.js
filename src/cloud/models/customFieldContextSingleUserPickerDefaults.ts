import { z } from 'zod';
import { apiObject } from '#/core';
import { UserFilterSchema } from './userFilter';
/** Defaults for a User Picker (single) custom field. */

export const CustomFieldContextSingleUserPickerDefaultsSchema = apiObject({
  /** The ID of the default user. */
  accountId: z.string(),
  /** The ID of the context. */
  contextId: z.string(),
  type: z.enum(['single.user.select']),
  userFilter: UserFilterSchema,
});

export type CustomFieldContextSingleUserPickerDefaults = z.infer<
  typeof CustomFieldContextSingleUserPickerDefaultsSchema
>;
