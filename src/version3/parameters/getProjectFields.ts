export interface GetProjectFields {
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The IDs of projects to return fields for. */
  projectId: number[];
  /** The IDs of work types (issue types) to return fields for. */
  workTypeId: number[];
  /** The IDs of fields to return. If not provided, all fields are returned. */
  fieldId?: string[];
}
