import type { WorkflowTransitionRulesUpdateErrorDetails } from './workflowTransitionRulesUpdateErrorDetails.js';

/** Details of any errors encountered while updating workflow transition rules. */
export interface WorkflowTransitionRulesUpdateErrors {
  /** A list of workflows. */
  updateResults: WorkflowTransitionRulesUpdateErrorDetails[];
}
