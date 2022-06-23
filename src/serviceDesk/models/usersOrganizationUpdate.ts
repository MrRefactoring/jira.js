export interface UsersOrganizationUpdate {
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. Use `accountIds` instead.
   */
  usernames?: string[];
  /** List of customers, specific by account IDs, to add to or remove from the organization. */
  accountIds?: string[];
}
