import { WorkflowId } from './workflowId';

/**
 * Details of any errors encountered while updating workflow transition rules for a workflow. */
export interface WorkflowTransitionRulesUpdateErrorDetails {
  workflowId: WorkflowId;
  /** A list of transition rule update errors, indexed by the transition rule ID. Any transition rule that appears here wasn't updated. */
  ruleUpdateErrors: {};
  /** The list of errors that specify why the workflow update failed. The workflow was not updated if the list contains any entries. */
  updateErrors: string[];
}
