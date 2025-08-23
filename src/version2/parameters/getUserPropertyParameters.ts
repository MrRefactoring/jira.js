import { z } from 'zod';

export const GetUserPropertyParametersSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  userKey: z.string().optional(),
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  username: z.string().optional(),
  /** The key of the user's property. */
  propertyKey: z.string(),
});

export type GetUserPropertyParameters = z.infer<typeof GetUserPropertyParametersSchema>;
