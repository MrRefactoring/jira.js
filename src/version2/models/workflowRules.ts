import { WorkflowTransitionRule } from './workflowTransitionRule';

/**
 * A collection of transition rules. */
export interface WorkflowRules {
  /** The workflow conditions. */
  conditions: WorkflowTransitionRule[];
  /** The workflow validators. */
  validators: WorkflowTransitionRule[];
  /** The workflow post functions. */
  postFunctions: WorkflowTransitionRule[];
}
