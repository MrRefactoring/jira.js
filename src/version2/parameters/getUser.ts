export interface GetUser {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required. */
  accountId?: string;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide) for details. */
  username?: string;
  /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide) for details. */
  key?: string;
  /** Use [expand](#expansion) to include additional information about users in the response. This parameter accepts a comma-separated list. Expand options include:

   *  `groups` includes all groups and nested groups to which the user belongs.
   *  `applicationRoles` includes details of all the applications to which the user has access. */
  expand?: string;
}
