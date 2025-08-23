import { z } from 'zod';

export const FindUsersWithBrowsePermissionParametersSchema = z.object({
  /**
   * A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant
   * users. The string can match the prefix of the attribute's value. For example, _query=john_ matches a user with a
   * `displayName` of _John Smith_ and a user with an `emailAddress` of _johnson@example.com_. Required, unless
   * `accountId` is specified.
   */
  query: z.string().optional(),
  /**
   * This parameter is no longer available. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  username: z.string().optional(),
  /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
  accountId: z.string().optional(),
  /** The issue key for the issue. Required, unless `projectKey` is specified. */
  issueKey: z.string().optional(),
  /** The project key for the project (case sensitive). Required, unless `issueKey` is specified. */
  projectKey: z.string().optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
});

export type FindUsersWithBrowsePermissionParameters = z.infer<typeof FindUsersWithBrowsePermissionParametersSchema>;
