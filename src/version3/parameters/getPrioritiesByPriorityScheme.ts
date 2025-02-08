export interface GetPrioritiesByPriorityScheme {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: string;
  /** The maximum number of items to return per page. */
  maxResults?: string;
  /** The priority scheme ID. */
  schemeId: string;
}
