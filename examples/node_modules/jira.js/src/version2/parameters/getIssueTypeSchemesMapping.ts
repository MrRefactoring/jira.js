export interface GetIssueTypeSchemesMapping {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of issue type scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `issueTypeSchemeId=10000&issueTypeSchemeId=10001`.
   */
  issueTypeSchemeId?: number[];
}
