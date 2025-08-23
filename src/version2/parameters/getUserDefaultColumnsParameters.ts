import { z } from 'zod';

export const GetUserDefaultColumnsParametersSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
  /**
   * This parameter is no longer available See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  username: z.string().optional(),
});

export type GetUserDefaultColumnsParameters = z.infer<typeof GetUserDefaultColumnsParametersSchema>;
