export interface GetOptionsForContext {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
  /** The ID of the option. */
  optionId?: number;
  /** Whether only options are returned. */
  onlyOptions?: boolean;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
