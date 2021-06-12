import { WorkflowConditionBean } from './workflowConditionBean';

/** A compound workflow transition rule condition. This object returns `nodeType` as `compound`. */
export interface WorkflowCompoundCondition {
  /** The compound condition operator. */
  operator: string;
  /** The list of workflow conditions. */
  conditions: WorkflowConditionBean[];
  nodeType: string;
}
