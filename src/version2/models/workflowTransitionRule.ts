/** A workflow transition rule. */
export interface WorkflowTransitionRule {
  /** EXPERIMENTAL. The configuration of the transition rule. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  configuration?: any;
  /** The type of the transition rule. */
  type: string;
}
