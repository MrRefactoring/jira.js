/**
 * The Jql specifying the issues available in the evaluated Jira expression under the `issues` context variable. Not all
 * issues returned by the Jql query are loaded, only those described by the `startAt` and `maxResults` properties. To
 * determine whether it is necessary to iterate to ensure all the issues returned by the Jql query are evaluated,
 * inspect `meta.issues.jql.count` in the response.
 */
export interface JexpJqlIssues {
  /** The Jql query. */
  query?: string;
  /** The index of the first issue to return from the Jql query. */
  startAt?: number;
  /**
   * The maximum number of issues to return from the Jql query. Inspect `meta.issues.jql.maxResults` in the response to
   * ensure the maximum value has not been exceeded.
   */
  maxResults?: number;
  /** Determines how to validate the Jql query and treat the validation results. */
  validation?: string;
}
