export interface GetAvailablePrioritiesByPriorityScheme {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The string to query priorities on by name. */
  query?: string;
  /** The priority scheme ID. */
  schemeId: string;
  /** A list of priority IDs to exclude from the results. */
  exclude?: string[];
}
