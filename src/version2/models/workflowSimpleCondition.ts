/**
 * A workflow transition condition rule. */
export interface WorkflowSimpleCondition {
  /** The type of the transition rule. */
  type: string;
  /** The configuration of the transition rule. This is currently returned only for some of the rule types. Availability of this property is subject to change. */
  configuration?: {};
  nodeType: string;
}
