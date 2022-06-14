export interface SearchPriorities {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The list of priority IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=2&id=3`. */
  id?: string[];
  /** Whether only the default priority is returned. */
  onlyDefault?: boolean;
}
