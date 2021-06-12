export interface GetProjectContextMapping {
  /** The ID of the custom field, for example `customfield\_10000`. */
  fieldId: string;
  /** The list of context IDs. To include multiple context, separate IDs with ampersand: `contextId=10000&contextId=10001`. */
  contextId?: number[];
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
