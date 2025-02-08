/** The statuses associated with each workflow. */
export interface StatusesPerWorkflow {
  /** The ID of the initial status for the workflow. */
  initialStatusId?: string;
  /** The status IDs associated with the workflow. */
  statuses?: string[];
  /** The ID of the workflow. */
  workflowId?: string;
}
