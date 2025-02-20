export interface SearchWorkflows {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `values.transitions` Returns the transitions that each workflow is associated with.
   */
  expand?: 'values.transitions' | string;
  /** String used to perform a case-insensitive partial match with workflow name. */
  queryString?: string;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `name` Sorts by workflow name.
   * - `created` Sorts by create time.
   * - `updated` Sorts by update time.
   */
  orderBy?:
    | 'name'
    | 'created'
    | 'updated'
    | '+name'
    | '+created'
    | '+updated'
    | '-name'
    | '-created'
    | '-updated'
    | string;
  /** The scope of the workflow. Global for company-managed projects and Project for team-managed projects. */
  scope?: string;
  /** Filters active and inactive workflows. */
  isActive?: boolean;
}
