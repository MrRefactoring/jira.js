import type { WorkflowTransitionRulesDetails } from './workflowTransitionRulesDetails.js';

/** Details of workflows and their transition rules to delete. */
export interface WorkflowsWithTransitionRulesDetails {
  /** The list of workflows with transition rules to delete. */
  workflows: WorkflowTransitionRulesDetails[];
}
