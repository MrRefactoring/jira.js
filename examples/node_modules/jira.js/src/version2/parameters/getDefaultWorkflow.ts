export interface GetDefaultWorkflow {
  /** The ID of the workflow scheme. */
  id: number;
  /**
   * Set to `true` to return the default workflow for the workflow scheme's draft rather than scheme itself. If the
   * workflow scheme does not have a draft, then the default workflow for the workflow scheme is returned.
   */
  returnDraftIfExists?: boolean;
}
