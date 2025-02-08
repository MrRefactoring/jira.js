export interface FindUserKeysByQuery {
  /** The search query. */
  query: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /**
   * The maximum number of items to return per page.
   *
   * @deprecated Use `maxResult` instead.
   */
  maxResults?: number;
  /** The maximum number of items to return per page. */
  maxResult?: number;
}
