export interface SearchSecuritySchemes {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: string;
  /** The maximum number of items to return per page. */
  maxResults?: string;
  /**
   * The list of issue security scheme IDs. To include multiple issue security scheme IDs, separate IDs with an
   * ampersand: `id=10000&id=10001`.
   */
  id?: string[];
  /**
   * The list of project IDs. To include multiple project IDs, separate IDs with an ampersand:
   * `projectId=10000&projectId=10001`.
   */
  projectId?: string[];
}
