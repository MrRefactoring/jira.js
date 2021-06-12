export interface GetWorkflow {
  /** The ID of the workflow scheme. */
  id: number;
  /** The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow. */
  workflowName?: string;
  /**
   * Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft
   * exists, the mapping from the workflow scheme is returned.
   */
  returnDraftIfExists?: boolean;
}
