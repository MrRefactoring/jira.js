/** The details of a workflow transition. */
export interface CreateWorkflowTransitionDetails {
  /** The name of the transition. The maximum length is 60 characters. */
  name: string;
  /** The description of the transition. The maximum length is 1000 characters. */
  description?: string;
  /** The statuses the transition can start from. */
  from?: string[];
  /** The status the transition goes to. */
  to: string;
  /** The type of the transition. */
  type: string;
}
