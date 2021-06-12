export interface FindGroups {
  /**
   * This parameter is deprecated, setting it does not affect the results. To find groups containing a particular user,
   * use [Get user groups](#api-rest-api-2-user-groups-get).
   */
  accountId?: string;
  /** The string to find in group names. */
  query?: string;
  /**
   * A group to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example,
   * `exclude=group1&exclude=group2`.
   */
  exclude?: string[];
  /**
   * The maximum number of groups to return. The maximum number of groups that can be returned is limited by the system
   * property `jira.ajax.autocomplete.limit`.
   */
  maxResults?: number;
  /**
   * This parameter is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  userName?: string;
}
