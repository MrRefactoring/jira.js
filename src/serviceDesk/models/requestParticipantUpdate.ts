export interface RequestParticipantUpdate {
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. Use `accountIds` instead.
   */
  usernames?: string[];
  /** List of users, specified by account IDs, to add to or remove as participants in the request. */
  accountIds?: string[];
}
