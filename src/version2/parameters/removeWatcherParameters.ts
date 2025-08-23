import { z } from 'zod';

export const RemoveWatcherParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * This parameter is no longer available. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  username: z.string().optional(),
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_. Required.
   */
  accountId: z.string().optional(),
});

export type RemoveWatcherParameters = z.infer<typeof RemoveWatcherParametersSchema>;
