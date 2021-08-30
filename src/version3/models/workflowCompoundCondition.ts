import { WorkflowCondition } from './workflowCondition';

/** A compound workflow transition rule condition. This object returns `nodeType` as `compound`. */
export interface WorkflowCompoundCondition {
  /** The compound condition operator. */
  operator: string;
  /** The list of workflow conditions. */
  conditions: WorkflowCondition[];
  nodeType: string;
}
