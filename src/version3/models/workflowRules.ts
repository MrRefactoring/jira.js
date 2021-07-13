import { WorkflowTransitionRule } from './workflowTransitionRule';
import { WorkflowCondition } from './workflowCondition';
import { WorkflowConditionBean } from './workflowConditionBean';

/** A collection of transition rules. */
export interface WorkflowRules {
  /**
   * The workflow conditions.
   * ([Deprecated](https://community.developer.atlassian.com/t/deprecation-of-conditions-body-param/48884))
   */
  conditions?: WorkflowTransitionRule[];
  conditionsTree?: WorkflowConditionBean | WorkflowCondition;
  /** The workflow validators. */
  validators?: WorkflowTransitionRule[];
  /** The workflow post functions. */
  postFunctions?: WorkflowTransitionRule[];
}
