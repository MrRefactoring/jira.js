export interface GetScreenSchemes {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `id=10000&id=10001`.
   */
  id?: number[];
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) include additional
   * information in the response. This parameter accepts `issueTypeScreenSchemes` that, for each screen schemes, returns
   * information about the issue type screen scheme the screen scheme is assigned to.
   */
  expand?: string;
  /** String used to perform a case-insensitive partial match with screen scheme name. */
  queryString?: string;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `id` Sorts by screen scheme ID.
   * - `name` Sorts by screen scheme name.
   */
  orderBy?: 'id' | 'name' | '+id' | '+name' | '-id' | '-name' | string;
}
