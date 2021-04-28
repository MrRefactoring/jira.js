export interface GetIssuesForBacklog {
  /** The ID of the board that has the backlog containing the requested issues. */
  boardId: number;
  /** The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for more details. */
  startAt?: number;
  /** The maximum number of issues to return per page. Default: 50. See the 'Pagination' section at the top of this page for more details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in your Jira instance. If you exceed this limit, your results will be truncated. */
  maxResults?: number;
  /** Filters results using a JQL query. If you define an order in your JQL query,
   it will override the default order of the returned issues.<br>
   Note that <code>username</code> and <code>userkey</code> can't be used as search terms for
   this parameter due to privacy reasons. Use <code>accountId</code> instead. */
  jql?: string;
  /** Specifies whether to validate the JQL query or not. Default: true. */
  validateQuery?: boolean;
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields?: string[];
  /** This parameter is currently not used. */
  expand?: string;
}
