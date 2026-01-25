export interface GetProjectsWithFieldSchemes {
  /** The starting index of the returned projects. Base index: 0. */
  startAt?: number;
  /** The maximum number of projects to return per page, maximum allowed value is 100. */
  maxResults?: number;
  /** List of project ids to filter the results by. */
  projectId: number[];
}
