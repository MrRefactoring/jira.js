export interface GetCurrentUser {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about user in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `groups` Returns all groups, including nested groups, the user belongs to.
   * - `applicationRoles` Returns the application roles the user is assigned to.
   */
  expand?: 'groups' | 'applicationRoles' | ('groups' | 'applicationRoles')[] | string | string[];
}
