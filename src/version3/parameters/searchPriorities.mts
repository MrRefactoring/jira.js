export interface SearchPriorities {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: string;
  /** The maximum number of items to return per page. */
  maxResults?: string;
  /** The list of priority IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=2&id=3`. */
  id?: string[];
  /**
   * The list of projects IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `projectId=10010&projectId=10111`.
   */
  projectId?: string[];
  /** Whether only the default priority is returned. */
  onlyDefault?: boolean;
}
