export interface GetUser {
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_. Required.
   */
  accountId?: string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about users in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `groups` includes all groups and nested groups to which the user belongs.
   * - `applicationRoles` includes details of all the applications to which the user has access.
   */
  expand?: 'groups' | 'applicationRoles' | ('groups' | 'applicationRoles')[] | string | string[];
}
