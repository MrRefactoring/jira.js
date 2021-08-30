/** The user details. */
export interface NewUserDetails {
  /** The URL of the user. */
  self?: string;
  /**
   * This property is no longer available. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * This property is no longer available. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /**
   * This property is no longer available. If the user has an Atlassian account, their password is not changed. If the
   * user does not have an Atlassian account, they are sent an email asking them set up an account.
   */
  password?: string;
  /** The email address for the user. */
  emailAddress: string;
  /**
   * A suggested display name for the user. If the user has an Atlassian account, their display name is not changed. If
   * the user does not have an Atlassian account, this display name is used as a suggestion for creating an account. The
   * user is sent an email asking them to set their display name and privacy preferences.
   */
  displayName: string;
  /** Deprecated, do not use. */
  applicationKeys?: string[];
}
