export interface GetBulkScreenTabs {
  /**
   * The list of screen IDs. To include multiple screen IDs, provide an ampersand-separated list. For example,
   * `screenId=10000&screenId=10001`.
   */
  screenId?: number[];
  /**
   * The list of tab IDs. To include multiple tab IDs, provide an ampersand-separated list. For example,
   * `tabId=10000&tabId=10001`.
   */
  tabId?: number[];
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. The maximum number is 100, */
  maxResult?: number;
}
