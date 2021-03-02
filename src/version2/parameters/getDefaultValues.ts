export interface GetDefaultValues {
  /** The ID of the custom field. */
  fieldId: string;
  /** The IDs of the contexts. */
  contextId?: number[];
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
