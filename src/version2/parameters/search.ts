export interface Search {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * `usages` Returns the project and issue types that use the status in their workflow.
   */
  expand?: 'usages' | 'usages'[] | string | string[];
  /** The project the status is part of or null for global statuses. */
  projectId?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** Term to match status names against or null to search for all statuses in the search scope. */
  searchString?: string;
}
