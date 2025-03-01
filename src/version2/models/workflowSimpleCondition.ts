/** A workflow transition rule condition. This object returns `nodeType` as `simple`. */
export interface WorkflowSimpleCondition {
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: {};
  nodeType: string;
  /** The type of the transition rule. */
  type: string;
}
