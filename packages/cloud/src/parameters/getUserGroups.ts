import { z } from 'zod';

export const GetUserGroupsSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters'),
});

export type GetUserGroups = z.input<typeof GetUserGroupsSchema>;
