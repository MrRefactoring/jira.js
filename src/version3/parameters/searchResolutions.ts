export interface SearchResolutions {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The list of resolutions IDs to be filtered out */
  id?: string[];
  /**
   * When set to true, return default only, when IDs provided, if none of them is default, return empty page. Default
   * value is false
   */
  onlyDefault?: boolean;
}
