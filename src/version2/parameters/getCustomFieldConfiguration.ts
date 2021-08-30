export interface GetCustomFieldConfiguration {
  /** The ID or key of the custom field, for example `customfield_10000`. */
  fieldIdOrKey: string;
  /**
   * The list of context IDs. To include multiple contexts, separate IDs with an ampersand:
   * `contextId=10000&contextId=10001`. Can't be provided with `issueId`, `projectKeyOrId`, or `issueTypeId`.
   */
  contextId?: number[];
  /**
   * The ID of the issue to filter results by. If the issue doesn't exist, an empty list is returned. Can't be provided
   * with `contextIds`, `projectKeyOrId`, or `issueTypeId`.
   */
  issueId?: number;
  /**
   * The ID or key of the project to filter results by. Must be provided with `issueTypeId`. Can't be provided with
   * `contextIds` or `issueId`.
   */
  projectKeyOrId?: string;
  /**
   * The ID of the issue type to filter results by. Must be provided with `projectKeyOrId`. Can't be provided with
   * `contextIds` or `issueId`.
   */
  issueTypeId?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
