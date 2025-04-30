/** A workflow transition rule. */
export interface WorkflowTransitionRule {
  /** The type of the transition rule. */
  type: string;
  /** EXPERIMENTAL. The configuration of the transition rule. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configuration?: any;
}
