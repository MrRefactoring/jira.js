/** Change the order of issue resolutions. */
export interface ReorderIssueResolutionsRequest {
  /** The list of resolution IDs to be reordered. Cannot contain duplicates nor after ID. */
  ids: string[];
  /** The ID of the resolution. Required if `position` isn't provided. */
  after?: string;
  /** The position for issue resolutions to be moved to. Required if `after` isn't provided. */
  position?: string;
}
