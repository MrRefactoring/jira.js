export interface UserWriteBean {
  /** The URL of the user. */
  self?: string;
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key?: string;
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name?: string;
  /**
   * This parameter is no longer available and will be removed from the documentation soon. If the user already has an
   * Atlassian account then their password will be unchanged. If the user does not have an Atlassian account they will
   * be sent an email asking them to set a new password.
   */
  password?: string;
  /** The email address for the user. */
  emailAddress: string;
  /**
   * A suggested display name for the user. If the user already has an Atlassian account then their existing display
   * name will be unchanged. If the user does not have an Atlassian account then this display name will be used as a
   * suggestion for creating the new account. The user will be sent an email asking them to set their actual display
   * name and privacy preferences.
   */
  displayName: string;
  /** Sends the user an email confirmation that they have been added to Jira. Default is `false`. */
  notification?: string;
  /** Deprecated, do not use. */
  applicationKeys?: string[];
}
