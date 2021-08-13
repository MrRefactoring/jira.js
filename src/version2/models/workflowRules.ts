import { WorkflowTransitionRule } from './workflowTransitionRule';
import { WorkflowCondition } from './workflowCondition';

/** A collection of transition rules. */
export interface WorkflowRules {
  /**
   * @deprecated
   * The workflow conditions.
   * ([Deprecated](https://community.developer.atlassian.com/t/deprecation-of-conditions-body-param/48884))
   */
  conditions?: WorkflowTransitionRule[];
  conditionsTree?: WorkflowCondition;
  /** The workflow validators. */
  validators?: WorkflowTransitionRule[];
  /** The workflow post functions. */
  postFunctions?: WorkflowTransitionRule[];
}
