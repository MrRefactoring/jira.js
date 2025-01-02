export interface GetIssueTypeScreenSchemeMappings {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /**
   * The list of issue type screen scheme IDs. To include multiple issue type screen schemes, separate IDs with
   * ampersand: `issueTypeScreenSchemeId=10000&issueTypeScreenSchemeId=10001`.
   */
  issueTypeScreenSchemeId?: number[];
}
