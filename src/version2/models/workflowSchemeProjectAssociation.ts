/** An associated workflow scheme and project. */
export interface WorkflowSchemeProjectAssociation {
  /** The ID of the workflow scheme. If the workflow scheme ID is `null`, the operation assigns the default workflow scheme. */
  workflowSchemeId?: string;
  /** The ID of the project. */
  projectId: string;
}
