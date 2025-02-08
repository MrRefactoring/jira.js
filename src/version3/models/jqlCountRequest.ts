export interface JQLCountRequest {
  /**
   * A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this field requires a
   * bounded query. A bounded query is a query with a search restriction.
   */
  jql: string;
}
