/** The user details. */
export interface NewUserDetails {
  /** The email address for the user. */
  emailAddress: string;
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
  /**
   * Products the new user has access to. Valid products are: jira-core, jira-servicedesk, jira-product-discovery,
   * jira-software. If left empty, the user will get default product access. To create a user without product access,
   * set this field to be an empty array.
   */
  products?: 'jira-core' | 'jira-servicedesk' | 'jira-product-discovery' | 'jira-software' | '' | string | string[];
  /** The URL of the user. */
  self?: string;
}
