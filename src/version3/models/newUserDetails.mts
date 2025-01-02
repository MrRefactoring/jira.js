/** The user details. */
export interface NewUserDetails {
  /** The URL of the user. */
  self?: string;
  /** The email address for the user. */
  emailAddress: string;
  /**
   * Products the new user has access to. Valid products are: jira-core, jira-servicedesk, jira-product-discovery,
   * jira-software. To create a user without product access, set this field to be an empty array. Defaults to
   * ['jira-core', 'jira-servicedesk', 'jira-product-discovery', 'jira-software'].
   */
  products?: ('jira-core' | 'jira-servicedesk' | 'jira-product-discovery' | 'jira-software' | string)[];
}
