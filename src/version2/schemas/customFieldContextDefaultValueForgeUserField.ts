import { z } from 'zod';
import { UserFilterSchema } from './userFilter';

/** Defaults for a Forge user custom field. */
export const CustomFieldContextDefaultValueForgeUserFieldSchema = z.object({
  /** The ID of the default user. */
  accountId: z.string(),
  /** The ID of the context. */
  contextId: z.string(),
  type: z.string(),
  userFilter: UserFilterSchema,
});

export type CustomFieldContextDefaultValueForgeUserField = z.infer<
  typeof CustomFieldContextDefaultValueForgeUserFieldSchema
>;
