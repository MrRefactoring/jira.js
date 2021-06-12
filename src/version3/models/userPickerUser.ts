/** A user found in a search. */
export interface UserPickerUser {
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * *5b10ac8d82e05b22cc7d4ef5*.
   */
  accountId?: string;
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /** The display name, email address, and key of the user with the matched query string highlighted with the HTML bold tag. */
  html?: string;
  /** The display name of the user. Depending on the user’s privacy setting, this may be returned as null. */
  displayName?: string;
  /** The avatar URL of the user. */
  avatarUrl?: string;
}
