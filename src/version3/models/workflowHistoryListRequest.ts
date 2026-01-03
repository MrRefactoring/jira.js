/** A request to read all the workflow history entries for a specific workflow. */
export interface WorkflowHistoryListRequest {
  /** The id of the workflow to read the history for. */
  workflowId?: string;
}
