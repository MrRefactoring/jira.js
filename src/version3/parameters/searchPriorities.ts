export interface SearchPriorities {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The list of priority IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=2&id=3`. */
  id?: string[];
  /**
   * The list of projects IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `projectId=10010&projectId=10111`.
   */
  projectId?: string[];
  /** The name of priority to search for. */
  priorityName?: string;
  /** Whether only the default priority is returned. */
  onlyDefault?: boolean;
  /**
   * Use `schemes` to return the associated priority schemes for each priority. Limited to returning first 15 priority
   * schemes per priority.
   */
  expand?: 'schemes' | string;
}
