export interface UserWrite {
  /** The URL of the user. */
  self?: string;
  /** The email address for the user. */
  emailAddress: string;
  /**
   * A suggested display name for the user. If the user has an Atlassian account, their display name is not changed. If
   * the user does not have an Atlassian account, this display name is used as a suggestion for creating an account. The
   * user is sent an email asking them to set their display name and privacy preferences.
   */
  displayName: string;
  /** Sends the user an email confirmation that they have been added to Jira. Default is `false`. */
  notification?: string;
}
