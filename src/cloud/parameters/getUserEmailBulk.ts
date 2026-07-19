import { z } from 'zod';

export const GetUserEmailBulkSchema = z.object({
  /**
   * The account IDs of the users for which emails are required. An `accountId` is an identifier that uniquely
   * identifies the user across all Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`. Note, this should be
   * treated as an opaque identifier (that is, do not assume any structure in the value).
   */
  accountId: z.array(z.string().max(128, 'accountId must be at most 128 characters')),
});

export type GetUserEmailBulk = z.input<typeof GetUserEmailBulkSchema>;
