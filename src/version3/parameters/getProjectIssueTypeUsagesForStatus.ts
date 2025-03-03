export interface GetProjectIssueTypeUsagesForStatus {
  /** The statusId to fetch issue type usages for */
  statusId: string;
  /** The projectId to fetch issue type usages for */
  projectId: string;
  /** The cursor for pagination */
  nextPageToken?: string;
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults?: number;
}
