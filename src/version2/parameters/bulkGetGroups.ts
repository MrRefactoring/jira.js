export interface BulkGetGroups {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The ID of a group. To specify multiple IDs, pass multiple `groupId` parameters. For example,
   * `groupId=5b10a2844c20165700ede21g&groupId=5b10ac8d82e05b22cc7d4ef5`.
   */
  groupId?: string[];
  /**
   * The name of a group. To specify multiple names, pass multiple `groupName` parameters. For example,
   * `groupName=administrators&groupName=jira-software-users`.
   */
  groupName?: string[];
}
