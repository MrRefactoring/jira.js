export interface GetProjectsByPriorityScheme {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: string;
  /** The maximum number of items to return per page. */
  maxResults?: string;
  /** The project IDs to filter by. For example, `projectId=10000&projectId=10001`. */
  projectId?: number[];
  /** The priority scheme ID. */
  schemeId: string;
  /** The string to query projects on by name. */
  query?: string;
}
