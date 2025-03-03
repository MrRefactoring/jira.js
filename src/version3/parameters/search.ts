export interface Search {
  /**
   * @deprecated See the [deprecation
   *   notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298) for details.
   *
   *   Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   *   information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   *   - `usages` Returns the project and issue types that use the status in their workflow.
   *   - `workflowUsages` Returns the workflows that use the status.
   */
  expand?: 'usages' | 'workflowUsages' | ('usages' | 'workflowUsages')[] | string | string[];
  /** The project the status is part of or null for global statuses. */
  projectId?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** Term to match status names against or null to search for all statuses in the search scope. */
  searchString?: string;
  /** Category of the status to filter by. The supported values are: `TODO`, `IN_PROGRESS`, and `DONE`. */
  statusCategory?: 'TODO' | 'IN_PROGRESS' | 'DONE' | string;
}
