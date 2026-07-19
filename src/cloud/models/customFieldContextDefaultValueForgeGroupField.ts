import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a Forge group custom field. */

export const CustomFieldContextDefaultValueForgeGroupFieldSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The ID of the the default group. */
  groupId: z.string(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueForgeGroupField = z.infer<
  typeof CustomFieldContextDefaultValueForgeGroupFieldSchema
>;
