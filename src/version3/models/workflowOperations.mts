/** Operations allowed on a workflow */
export interface WorkflowOperations {
  /** Whether the workflow can be updated. */
  canEdit: boolean;
  /** Whether the workflow can be deleted. */
  canDelete: boolean;
}
