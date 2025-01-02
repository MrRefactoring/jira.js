/** A workflow transition condition. */
export interface CreateWorkflowCondition {
  /** The list of workflow conditions. */
  conditions?: CreateWorkflowCondition[];
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: {};
  /** The compound condition operator. */
  operator?: string;
  /** The type of the transition rule. */
  type?: string;
}
