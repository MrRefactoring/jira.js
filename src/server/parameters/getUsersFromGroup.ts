import { z } from 'zod';

export const GetUsersFromGroupSchema = z.object({
  /** Include inactive users. */
  includeInactiveUsers: z.boolean().optional(),
  /** The maximum number of users to return. */
  maxResults: z.number().optional(),
  /** The group name. */
  groupname: z.string(),
  /** The index of the first user in group to return. */
  startAt: z.number().optional(),
});

export type GetUsersFromGroup = z.input<typeof GetUsersFromGroupSchema>;
