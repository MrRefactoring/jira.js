import type { WorkflowCondition } from './workflowCondition.mjs';
import type { WorkflowTransitionRule } from './workflowTransitionRule.mjs';

/** A collection of transition rules. */
export interface WorkflowRules {
  conditionsTree?: WorkflowCondition;
  /** The workflow validators. */
  validators?: WorkflowTransitionRule[];
  /** The workflow post functions. */
  postFunctions?: WorkflowTransitionRule[];
}
