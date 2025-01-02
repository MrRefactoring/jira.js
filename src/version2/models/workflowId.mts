/** Properties that identify a workflow. */
export interface WorkflowId {
  /** Whether the workflow is in the draft state. */
  draft: boolean;
  /** The name of the workflow. */
  name: string;
}
