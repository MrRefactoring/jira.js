export interface GetIssuesForBoard {
  /** The ID of the board that contains the requested issues. */
  boardId: number;
  /**
   * The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt?: number;
  /**
   * The maximum number of issues to return per page. See the 'Pagination' section at the top of this page for more
   * details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in
   * your Jira instance. If you exceed this limit, your results will be truncated.
   */
  maxResults?: number;
  /**
   * Filters results using a Jql query. If you define an order in your Jql query, it will override the default order of
   * the returned issues. Note that `username` and `userkey` can't be used as search terms for this parameter due to
   * privacy reasons. Use `accountId` instead.
   */
  jql?: string;
  /** Specifies whether to validate the Jql query or not. Default: true. */
  validateQuery?: boolean;
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields?: string[];
  /** This parameter is currently not used. */
  expand?: string;
}
