import type { WorkflowId } from './workflowId.js';

/** Details about a workflow configuration update request. */
export interface WorkflowTransitionRulesDetails {
  workflowId: WorkflowId;
  /** The list of connect workflow rule IDs. */
  workflowRuleIds: string[];
}
