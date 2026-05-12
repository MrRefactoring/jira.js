import { z } from 'zod';

export const RemoveWatcherSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_. Required.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').optional(),
});

export type RemoveWatcher = z.input<typeof RemoveWatcherSchema>;
