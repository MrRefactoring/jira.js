export interface DeleteWorkflowMapping {
  /** The ID of the workflow scheme. */
  id: number;
  /** The name of the workflow. */
  workflowName: string;
  /**
   * Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the
   * workflow scheme cannot be edited. Defaults to `false`.
   */
  updateDraftIfNeeded?: boolean;
}
