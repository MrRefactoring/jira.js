export interface SearchFieldAssociationSchemeProjects {
  /** The starting index of the returned projects. Base index: 0. */
  startAt?: number;
  /** The maximum number of projects to return per page, maximum allowed value is 100. */
  maxResults?: number;
  /** The project Ids to filter by, if empty then all projects belonging to a field association scheme will be returned */
  projectId?: number[];
  /** The scheme id to search for associated projects */
  id: number;
}
