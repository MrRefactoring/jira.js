import { z } from 'zod';

export const RemoveUserFromGroupSchema = z.object({
  /**
   * As a group's name can change, use of `groupId` is recommended to identify a group. The name of the group. This
   * parameter cannot be used with the `groupId` parameter.
   */
  groupname: z.string().optional(),
  /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
  groupId: z.string().optional(),
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters'),
});

export type RemoveUserFromGroup = z.input<typeof RemoveUserFromGroupSchema>;
