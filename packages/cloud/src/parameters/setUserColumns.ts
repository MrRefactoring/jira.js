import { z } from 'zod';

export const SetUserColumnsSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
  body: z.record(z.string(), z.any()),
});

export type SetUserColumns = z.input<typeof SetUserColumnsSchema>;
