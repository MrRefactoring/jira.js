export interface GetOptionsForField {
  /** The ID of the custom field. Note: This is the numeric part of the of the field ID. For example, for a field with the ID *customfield\_10075* use *10075*. */
  fieldId: number;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
