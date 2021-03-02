/**
 * A workflow transition rule. */
export interface WorkflowTransitionRule {
  /** The type of the transition rule. */
  type: string;
  /** The configuration of the transition rule. This is currently returned only for some of the rule types. Availability of this property is subject to change. */
  configuration?: any;
}
