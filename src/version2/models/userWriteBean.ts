export interface UserWriteBean {
  /** The URL of the user. */
  self?: string;
  /** The key for the user. When provided with `name`, overrides the value in `name` to set both `name` and `key`. This property is deprecated because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** The username for the user. This property is deprecated because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  name?: string;
  /** A password for the user. If a password is not set, a random password is generated. */
  password?: string;
  /** The email address for the user. */
  emailAddress: string;
  /** The display name for the user. */
  displayName: string;
  /** Sends the user an email confirmation that they have been added to Jira. Default is `false`. */
  notification?: string;
  /** Deprecated, do not use. */
  applicationKeys?: string[];
}
