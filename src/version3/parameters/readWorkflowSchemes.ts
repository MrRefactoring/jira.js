/** The workflow scheme read request body. */
export interface ReadWorkflowSchemes {
  /** The list of project IDs to query. */
  projectIds?: string[];
  /** The list of workflow scheme IDs to query. */
  workflowSchemeIds?: string[];
}
