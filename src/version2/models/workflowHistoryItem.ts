/** A single entry in the WorkflowHistoryPage. */
export interface WorkflowHistoryItem {
  /** Whether the version is an intermediate workflow state, sometimes created during workflow updates. */
  isIntermediate?: boolean;
  workflowId?: string;
  workflowVersion?: number;
  /** The timestamp when this workflow version was created. */
  writtenAt?: string;
}
