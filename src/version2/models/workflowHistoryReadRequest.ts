/** A request to read a specific workflow version from history. */
export interface WorkflowHistoryReadRequest {
  version?: number;
  workflowId?: string;
}
