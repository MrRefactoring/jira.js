export interface GetWorkflowUsagesForStatus {
  /** The statusId to fetch workflow usages for */
  statusId: string;
  /** The cursor for pagination */
  nextPageToken?: string;
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults?: number;
}
