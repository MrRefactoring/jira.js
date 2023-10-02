/** The status reference and port that a transition is connected to. */
export interface WorkflowStatusAndPort {
  /** The port the transition is connected to this status. */
  port?: number;
  /** The reference of this status. */
  statusReference?: string;
}
