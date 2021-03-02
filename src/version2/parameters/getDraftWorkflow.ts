export interface GetDraftWorkflow {
  /** The ID of the workflow scheme that the draft belongs to. */
  id: number;
  /** The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow. */
  workflowName?: string;
}
