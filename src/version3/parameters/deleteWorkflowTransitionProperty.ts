export interface DeleteWorkflowTransitionProperty {
  /**
   * The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown
   * next to the transition.
   */
  transitionId: number;
  /** The name of the transition property to delete, also known as the name of the property. */
  key: string;
  /** The name of the workflow that the transition belongs to. */
  workflowName: string;
  /** The workflow status. Set to `live` for inactive workflows or `draft` for draft workflows. Active workflows cannot be edited. */
  workflowMode?: string;
}
