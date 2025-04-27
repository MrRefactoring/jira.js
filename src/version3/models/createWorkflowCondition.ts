/** A workflow transition condition. */
export interface CreateWorkflowCondition {
  /** The compound condition operator. */
  operator?: string;
  /** The list of workflow conditions. */
  conditions?: CreateWorkflowCondition[];
  /** The type of the transition rule. */
  type?: string;
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: unknown;
}
