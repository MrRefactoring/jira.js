import { z } from 'zod';

export const RemoveUserFromGroupSchema = z.object({
  /** A name of requested group. */
  groupname: z.string(),
  /** User to remove from a group */
  username: z.string(),
});

export type RemoveUserFromGroup = z.input<typeof RemoveUserFromGroupSchema>;
