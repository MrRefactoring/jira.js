export interface GetIssueAdjustments {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand
   * options include:
   *
   * - `data` Returns issue adjustment data.
   * - `contexts` Returns issue adjustment contexts.
   */
  expand?: 'data' | 'contexts' | ('data' | 'contexts')[] | string | string[];
}
