import { z } from 'zod';
import { UserFilterSchema } from './userFilter';

/** Defaults for a User Picker (single) custom field. */
export const CustomFieldContextSingleUserPickerDefaultsSchema = z.object({
  /** The ID of the default user. */
  accountId: z.string(),
  /** The ID of the context. */
  contextId: z.string(),
  type: z.string(),
  userFilter: UserFilterSchema,
});

export type CustomFieldContextSingleUserPickerDefaults = z.infer<
  typeof CustomFieldContextSingleUserPickerDefaultsSchema
>;
