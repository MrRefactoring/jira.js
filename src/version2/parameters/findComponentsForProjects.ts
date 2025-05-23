export interface FindComponentsForProjects {
  /** The project IDs and/or project keys (case sensitive). */
  projectIdsOrKeys?: string[];
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * `description` Sorts by the component description. `name` Sorts by component name.
   */
  orderBy?: 'description' | '-description' | '+description' | 'name' | '-name' | '+name' | string;
  /**
   * Filter the results using a literal string. Components with a matching `name` or `description` are returned (case
   * insensitive).
   */
  query?: string;
}
