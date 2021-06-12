export interface GetCustomFieldConfiguration {
  /** The ID or key of the custom field, for example `customfield\_10000`. */
  fieldIdOrKey: string;
  /**
   * The list of context IDs. To include multiple contexts, separate IDs with an ampersand:
   * `contextId=10000&contextId=10001`. Either this or `issueId` can be provided, but not both.
   */
  contextId?: number[];
  /**
   * The ID of the issue to filter results by. If none exists, an empty list is returned. Either this or `contextIds`
   * can be provided, but not both.
   */
  issueId?: number;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
