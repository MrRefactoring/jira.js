export interface GetComments {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** [Order](#ordering) the results by a field. Accepts *created* to sort comments by their created date. */
  orderBy?: string;
  /** Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML. */
  expand?: string;
}
