import { z } from 'zod';

/** Defaults for a Forge collection of users custom field. */
export const CustomFieldContextDefaultValueForgeMultiUserFieldSchema = z.object({
  /** The IDs of the default users. */
  accountIds: z.array(z.string()),
  /** The ID of the context. */
  contextId: z.string(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueForgeMultiUserField = z.infer<
  typeof CustomFieldContextDefaultValueForgeMultiUserFieldSchema
>;
