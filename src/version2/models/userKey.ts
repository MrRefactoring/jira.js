/** List of user account IDs. */
export interface UserKey {
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_. Returns _unknown_ if the record is deleted and corrupted, for example, as the result of
   * a server import.
   */
  accountId?: string;
}
