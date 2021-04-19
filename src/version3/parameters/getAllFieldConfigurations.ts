export interface GetAllFieldConfigurations {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The list of field configuration IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. */
  id?: number[];
  /** If *true* returns the default field configuration only. */
  isDefault?: boolean;
  /** String object used for filtering the items by name or description (the string is used for both fields) */
  query?: string;
}
