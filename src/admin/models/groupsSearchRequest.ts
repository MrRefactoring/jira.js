import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { GroupNamesSchema } from './groupNames';

export const GroupsSearchRequestSchema = apiObject({
  /** Unique ID that serves as reference to the group. */
  groupIds: z.array(z.string().max(100, 'groupIds must be at most 100 characters')).optional(),
  groupNames: GroupNamesSchema.optional(),
  /** Cursor specifying the starting point for page result retrieval. */
  cursor: z.string().optional(),
  /** The number of items to return. Default = max = 1000 */
  limit: z.number().optional(),
  /**
   * Indicates the user information fields to include in the response. If unspecified, the response defaults to id, name
   * and description.
   */
  expand: z.array(openEnum(['USERS', 'META', 'ROLE_ASSIGNMENTS', 'MANAGEMENT_ACCESS'])).optional(),
});

export type GroupsSearchRequest = z.infer<typeof GroupsSearchRequestSchema>;
