import { WorkflowConditionBean } from './workflowConditionBean';

/**
 * A workflow transition compound condition rule. */
export interface WorkflowCompoundCondition {
  /** The conditions operator. */
  operator: string;
  /** The list of workflow conditions. */
  conditions: WorkflowConditionBean[];
  nodeType: string;
}
