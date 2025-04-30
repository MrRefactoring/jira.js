/** A user found in a search. */
export interface UserPickerUser {
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId?: string;
  /** The avatar URL of the user. */
  avatarUrl?: string;
  /** The display name of the user. Depending on the user’s privacy setting, this may be returned as null. */
  displayName?: string;
  /**
   * The display name, email address, and key of the user with the matched query string highlighted with the HTML bold
   * tag.
   */
  html?: string;
  /**
   * This property is no longer available. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * This property is no longer available . See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
}
