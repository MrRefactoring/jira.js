export interface GetProjectUsagesForWorkflowScheme {
  /** The workflow scheme ID */
  workflowSchemeId: string;
  /** The cursor for pagination */
  nextPageToken?: string;
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults?: number;
}
