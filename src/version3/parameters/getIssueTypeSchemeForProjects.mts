export interface GetIssueTypeSchemeForProjects {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of project IDs. To include multiple project IDs, provide an ampersand-separated list. For example,
   * `projectId=10000&projectId=10001`.
   */
  projectId: number[];
}
