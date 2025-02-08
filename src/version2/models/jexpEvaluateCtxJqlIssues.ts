/** The JQL query that specifies the set of issues available in the Jira expression. */
export interface JexpEvaluateCtxJqlIssues {
  /**
   * The maximum number of issues to return from the JQL query. Inspect `meta.issues.jql.maxResults` in the response to
   * ensure the maximum value has not been exceeded.
   */
  maxResults?: number;
  /**
   * The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the
   * `nextPageToken` to fetch the next page of issues.
   */
  nextPageToken?: string;
  /** The JQL query, required to be bounded. Additionally, `orderBy` clause can contain a maximum of 7 fields */
  query?: string;
}
