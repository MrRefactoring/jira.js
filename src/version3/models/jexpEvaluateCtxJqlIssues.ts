/**
 * The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. Not all
 * issues returned by the JQL query are loaded, only those described by the `nextPageToken` and `maxResults` properties.
 * This bean will be replacing JexpJqlIssues bean as part of new `evaluate` endpoint
 */
export interface JexpEvaluateCtxJqlIssues {
  /**
   * The maximum number of issues to return from the JQL query. max results value considered may be lower than the
   * number specific here.
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
