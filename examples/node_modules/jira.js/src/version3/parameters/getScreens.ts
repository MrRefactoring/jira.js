export interface GetScreens {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of screen IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `id=10000&id=10001`.
   */
  id?: number[];
  /** String used to perform a case-insensitive partial match with screen name. */
  queryString?: string;
  /**
   * The scope filter string. To filter by multiple scope, provide an ampersand-separated list. For example,
   * `scope=GLOBAL&scope=PROJECT`.
   */
  scope?: ('GLOBAL' | 'TEMPLATE' | 'PROJECT' | string)[];
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#ordering) the results by a field:
   *
   * - `id` Sorts by screen ID.
   * - `name` Sorts by screen name.
   */
  orderBy?: 'name' | '-name' | '+name' | 'id' | '-id' | '+id' | string;
}
