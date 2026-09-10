import { z } from 'zod';
import { apiObject } from '#/core';

export const AddGroupMembershipInputSchema = apiObject({
  /**
   * Unique ID of the user's account that you are adding to the group. Use the [Jira User Search
   * API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-rest-api-3-users-search-get)
   * to get the accountId (if Jira is available for your Organization). **Jira APIs use a different [authentication
   * method ](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/).** If you don’t have Jira,
   * export a .csv of the user list. Learn how to [export users from a
   * site](https://support.atlassian.com/organization-administration/docs/export-users-from-a-site/).
   */
  account_id: z.string(),
});

export type AddGroupMembershipInput = z.infer<typeof AddGroupMembershipInputSchema>;
