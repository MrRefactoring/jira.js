import { z } from 'zod';

/** List of user account IDs. */
export const UserKeySchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_. Returns _unknown_ if the record is deleted and corrupted, for example, as the result of
   * a server import.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
});

export type UserKey = z.infer<typeof UserKeySchema>;
