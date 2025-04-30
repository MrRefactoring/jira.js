export interface DeleteDefaultWorkflow {
    /** The ID of the workflow scheme. */
    id: number;
    /**
     * Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the
     * workflow scheme cannot be edited. Defaults to `false`.
     */
    updateDraftIfNeeded?: boolean;
}
