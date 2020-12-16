/**
 * Details about the server Jira is running on. */
export interface WorkflowTransitionProperty {
  /** The key of the transition property. Also known as the name of the transition property. */
  key?: string;
  /** The value of the transition property. */
  value: string;
  /** The ID of the transition property. */
  id?: string;
}
