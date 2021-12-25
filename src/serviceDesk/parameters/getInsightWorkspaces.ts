export interface GetInsightWorkspaces {
  /** The starting index of the returned workspace IDs. Base index: 0 See the [Pagination](#pagination) section for more details. */
  start?: number;
  /**
   * The maximum number of workspace IDs to return per page. Default: 50 See the [Pagination](#pagination) section for
   * more details.
   */
  limit?: number;
}
