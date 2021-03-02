/**
 * Details about the default workflow. */
export interface DefaultWorkflow {
  /** The name of the workflow to set as the default workflow. */
  workflow: string;
  /** Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new default workflow. Defaults to `false`. */
  updateDraftIfNeeded?: boolean;
}
