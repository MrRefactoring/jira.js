export interface GetWorkflowProjectIssueTypeUsages {
  /** The workflow ID */
  workflowId: string;
  /** The project ID */
  projectId: number;
  /** The cursor for pagination */
  nextPageToken?: string;
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults?: number;
}
