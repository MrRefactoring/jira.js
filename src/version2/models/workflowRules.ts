import type { WorkflowCondition } from './workflowCondition.js';
import type { WorkflowTransitionRule } from './workflowTransitionRule.js';

/** A collection of transition rules. */
export interface WorkflowRules {
  conditionsTree?: WorkflowCondition;
  /** The workflow post functions. */
  postFunctions?: WorkflowTransitionRule[];
  /** The workflow validators. */
  validators?: WorkflowTransitionRule[];
}
