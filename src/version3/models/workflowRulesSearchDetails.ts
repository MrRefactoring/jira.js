import { WorkflowTransitionRules } from './workflowTransitionRules';

/** Details of workflow transition rules. */
export interface WorkflowRulesSearchDetails {
  /** The workflow ID. */
  workflowEntityId?: string;
  /** List of workflow rule IDs that do not belong to the workflow or can not be found. */
  invalidRules?: string[];
  /** List of valid workflow transition rules. */
  validRules?: WorkflowTransitionRules[];
}
