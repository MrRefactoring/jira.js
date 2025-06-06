export interface GetPrioritiesByPriorityScheme {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The priority scheme ID. */
  schemeId: string;
}
