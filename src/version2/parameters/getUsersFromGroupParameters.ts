import { z } from 'zod';

export const GetUsersFromGroupParametersSchema = z.object({
  /**
   * As a group's name can change, use of `groupId` is recommended to identify a group. The name of the group. This
   * parameter cannot be used with the `groupId` parameter.
   */
  groupname: z.string().optional(),
  /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
  groupId: z.string().optional(),
  /** Include inactive users. */
  includeInactiveUsers: z.boolean().optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page (number should be between 1 and 50). */
  maxResults: z.number().int().optional(),
});

export type GetUsersFromGroupParameters = z.infer<typeof GetUsersFromGroupParametersSchema>;
