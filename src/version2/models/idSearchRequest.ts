export interface IdSearchRequest {
  /** A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. Order by clauses are not allowed. */
  jql?: string;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The continuation token to fetch the next page. This token is provided by the response of this endpoint. */
  nextPageToken?: string;
}
