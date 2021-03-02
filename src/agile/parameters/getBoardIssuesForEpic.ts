export interface GetBoardIssuesForEpic {
  /** The ID of the board that contains the requested issues. */
  boardId: number;
  /** The ID of the epic that contains the requested issues. */
  epicId: number;
  /** The starting index of the returned issues. Base index: 0. See the 'Pagination' section at the top of this page for more details. */
  startAt?: number;
  /** The maximum number of issues to return per page. Default: 50. See the 'Pagination' section at the top of this page for more details. Note, the total number of issues returned is limited by the property 'jira.search.views.default.max' in your Jira instance. If you exceed this limit, your results will be truncated. */
  maxResults?: number;
  /** Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues. */
  jql?: string;
  /** Specifies whether to validate the JQL query or not. Default: true. */
  validateQuery?: boolean;
  /** The list of fields to return for each issue. By default, all navigable and Agile fields are returned. */
  fields?: string[];
  /** A comma-separated list of the parameters to expand. */
  expand?: string;
}
