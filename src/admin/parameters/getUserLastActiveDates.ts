import { z } from 'zod';

export const GetUserLastActiveDatesSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * Unique ID of the user's account. Use the [Jira User Search
   * API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-rest-api-3-users-search-get)
   * to get the accountId (if Jira is available for your Organization). **Jira APIs use a different [authentication
   * method ](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/).** If you don’t have Jira,
   * export a .csv of the user list. Learn how to [export users from a
   * site](https://support.atlassian.com/organization-administration/docs/export-users-from-a-site/).
   */
  accountId: z.string(),
  /** Cursor to fetch the next page */
  cursor: z.string().optional(),
});

export type GetUserLastActiveDates = z.input<typeof GetUserLastActiveDatesSchema>;
