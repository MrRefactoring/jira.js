export interface GetUserProperty {
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * *5b10ac8d82e05b22cc7d4ef5*.
   */
  accountId?: string;
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  userKey?: string;
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  username?: string;
  /** The key of the user's property. */
  propertyKey: string;
}
