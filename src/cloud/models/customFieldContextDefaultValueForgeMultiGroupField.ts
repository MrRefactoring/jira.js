import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a Forge collection of groups custom field. */

export const CustomFieldContextDefaultValueForgeMultiGroupFieldSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The IDs of the default groups. */
  groupIds: z.array(z.string()),
  type: z.enum(['forge.group.list']),
});

export type CustomFieldContextDefaultValueForgeMultiGroupField = z.infer<
  typeof CustomFieldContextDefaultValueForgeMultiGroupFieldSchema
>;
