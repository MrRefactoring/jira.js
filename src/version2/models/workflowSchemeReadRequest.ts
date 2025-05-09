/** The workflow scheme read request body. */
export interface WorkflowSchemeReadRequest {
  /** The list of project IDs to query. */
  projectIds?: string[];
  /** The list of workflow scheme IDs to query. */
  workflowSchemeIds?: string[];
}
