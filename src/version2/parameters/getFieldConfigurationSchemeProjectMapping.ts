export interface GetFieldConfigurationSchemeProjectMapping {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The list of project IDs. To include multiple projects, separate IDs with ampersand: `projectId=10000&projectId=10001`. */
  projectId: number[];
}
