export interface GetContextsForField {
  /** The ID of the custom field. */
  fieldId: string;
  /** Whether to return contexts that apply to all issue types. */
  isAnyIssueType?: boolean;
  /** Whether to return contexts that apply to all projects. */
  isGlobalContext?: boolean;
  /** The list of context IDs. To include multiple contexts, separate IDs with ampersand: `contextId=10000&contextId=10001`. */
  contextId?: number[];
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
