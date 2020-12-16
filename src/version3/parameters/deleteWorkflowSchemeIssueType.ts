export interface DeleteWorkflowSchemeIssueType {
  /** The ID of the workflow scheme. */
  id: number;
  /** The ID of the issue type. */
  issueType: string;
  /** Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`. */
  updateDraftIfNeeded?: boolean;
}
