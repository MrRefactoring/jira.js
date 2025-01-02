/** Details about the mapping between issue types and a workflow. */
export interface IssueTypesWorkflowMapping {
  /** Whether the workflow is the default workflow for the workflow scheme. */
  defaultMapping?: boolean;
  /** The list of issue type IDs. */
  issueTypes?: string[];
  /**
   * Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated
   * with the new workflow-issue types mapping. Defaults to `false`.
   */
  updateDraftIfNeeded?: boolean;
  /** The name of the workflow. Optional if updating the workflow-issue types mapping. */
  workflow?: string;
}
