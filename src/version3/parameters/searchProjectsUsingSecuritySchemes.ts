export interface SearchProjectsUsingSecuritySchemes {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The list of security scheme IDs to be filtered out. */
  issueSecuritySchemeId?: string[];
  /** The list of project IDs to be filtered out. */
  projectId?: string[];
}
