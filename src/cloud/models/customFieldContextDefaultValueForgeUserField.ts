import { z } from 'zod';
import { apiObject } from '#/core';
import { UserFilterSchema } from './userFilter';
/** Defaults for a Forge user custom field. */

export const CustomFieldContextDefaultValueForgeUserFieldSchema = apiObject({
  /** The ID of the default user. */
  accountId: z.string(),
  /** The ID of the context. */
  contextId: z.string(),
  type: z.enum(['forge.user']),
  userFilter: UserFilterSchema,
});

export type CustomFieldContextDefaultValueForgeUserField = z.infer<
  typeof CustomFieldContextDefaultValueForgeUserFieldSchema
>;
