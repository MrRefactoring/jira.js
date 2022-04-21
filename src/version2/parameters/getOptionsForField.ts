export interface GetOptionsForField {
  /**
   * The ID of the custom field. Note: This is the numeric part of the of the field ID. For example, for a field with
   * the ID _customfield_10075_ use _10075_.
   */
  fieldId: number;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
