/** The statuses the transition can start from, and the mapping of ports between the statuses. */
export interface WorkflowTransitionLinks {
  /** The port that the transition starts from. */
  fromPort?: number;
  /** The status that the transition starts from. */
  fromStatusReference?: string;
  /** The port that the transition goes to. */
  toPort?: number;
}
