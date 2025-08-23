import { z } from 'zod';

export const BulkGetUsersParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  username: z.array(z.string()).optional(),
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key: z.array(z.string()).optional(),
  /**
   * The account ID of a user. To specify multiple users, pass multiple `accountId` parameters. For example,
   * `accountId=5b10a2844c20165700ede21g&accountId=5b10ac8d82e05b22cc7d4ef5`.
   */
  accountId: z.array(z.string()),
});

export type BulkGetUsersParameters = z.infer<typeof BulkGetUsersParametersSchema>;
