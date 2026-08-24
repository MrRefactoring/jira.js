import { z } from 'zod';

export const GetGroupSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * Unique ID associated with a directory. The `-` character can be used to increase the operation scope to all
   * directories the requestor has permission to manage.
   */
  directoryId: z.string(),
  /** Unique ID associated with a group. */
  groupId: z.string(),
});

export type GetGroup = z.input<typeof GetGroupSchema>;
