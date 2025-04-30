/** Properties that identify a workflow. */
export interface WorkflowId {
    /** The name of the workflow. */
    name: string;
    /** Whether the workflow is in the draft state. */
    draft: boolean;
}
