import { z } from 'zod';
import { apiObject } from '#/core';
/** Defaults for a Forge collection of users custom field. */

export const CustomFieldContextDefaultValueForgeMultiUserFieldSchema = apiObject({
  /** The IDs of the default users. */
  accountIds: z.array(z.string()),
  /** The ID of the context. */
  contextId: z.string(),
  type: z.enum(['forge.user.list']),
});

export type CustomFieldContextDefaultValueForgeMultiUserField = z.infer<
  typeof CustomFieldContextDefaultValueForgeMultiUserFieldSchema
>;
