import { WorkflowCondition } from './workflowCondition';
import { WorkflowTransitionRule } from './workflowTransitionRule';

/** A collection of transition rules. */
export interface WorkflowRules {
  conditionsTree?: WorkflowCondition;
  /** The workflow post functions. */
  postFunctions?: WorkflowTransitionRule[];
  /** The workflow validators. */
  validators?: WorkflowTransitionRule[];
}
