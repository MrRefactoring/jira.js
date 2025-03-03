/** The explicit association between issue types and a workflow in a workflow scheme. */
export interface WorkflowSchemeAssociation {
  /** The issue types assigned to the workflow. */
  issueTypeIds: string[];
  /** The ID of the workflow. */
  workflowId: string;
}
