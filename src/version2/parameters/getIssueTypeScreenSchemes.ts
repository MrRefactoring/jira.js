export interface GetIssueTypeScreenSchemes {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of issue type screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For
   * example, `id=10000&id=10001`.
   */
  id?: number[];
  /** String used to perform a case-insensitive partial match with issue type screen scheme name. */
  queryString?: string;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `name` Sorts by issue type screen scheme name.
   * - `id` Sorts by issue type screen scheme ID.
   */
  orderBy?: 'name' | 'id' | '+name' | '+id' | '-name' | '-id' | string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts `projects` that, for each issue type screen schemes, returns
   * information about the projects the issue type screen scheme is assigned to.
   */
  expand?: string;
}
