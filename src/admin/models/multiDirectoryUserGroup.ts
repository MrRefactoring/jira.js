import { z } from 'zod';
import { apiObject } from '#/core';
/** A group the user is a member of within the requested directory. */

export const MultiDirectoryUserGroupSchema = apiObject({
  /** The unique ID of the group. */
  id: z.string().optional(),
  /** The display name of the group. */
  name: z.string().nullish(),
  /** The description of the group. */
  description: z.string().nullish(),
});

export type MultiDirectoryUserGroup = z.infer<typeof MultiDirectoryUserGroupSchema>;
