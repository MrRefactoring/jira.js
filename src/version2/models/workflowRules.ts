import { WorkflowTransitionRule } from './workflowTransitionRule';
import { WorkflowConditionBean } from './workflowConditionBean';

/**
 * A collection of transition rules. */
export interface WorkflowRules {
  /** The workflow conditions. */
  conditions: WorkflowTransitionRule[];
  conditionsTree?: WorkflowConditionBean;
  /** The workflow validators. */
  validators: WorkflowTransitionRule[];
  /** The workflow post functions. */
  postFunctions: WorkflowTransitionRule[];
}
