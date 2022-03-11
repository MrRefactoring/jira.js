export interface FindGroups {
  /**
   * This parameter is deprecated, setting it does not affect the results. To find groups containing a particular user,
   * use [Get user groups](#api-rest-api-2-user-groups-get).
   */
  accountId?: string;
  /** The string to find in group names. */
  query?: string;
  /**
   * As a group's name can change, use of `excludeGroupIds` is recommended to identify a group. A group to exclude from
   * the result. To exclude multiple groups, provide an ampersand-separated list. For example,
   * `exclude=group1&exclude=group2`. This parameter cannot be used with the `excludeGroupIds` parameter.
   */
  exclude?: string[];
  /**
   * A group ID to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For
   * example, `excludeId=group1-id&excludeId=group2-id`. This parameter cannot be used with the `excludeGroups` parameter.
   */
  excludeId?: string[];
  /**
   * The maximum number of groups to return. The maximum number of groups that can be returned is limited by the system
   * property `jira.ajax.autocomplete.limit`.
   */
  maxResults?: number;
  /**
   * This parameter is no longer available. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  userName?: string;
}
