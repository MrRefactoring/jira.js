import { ConnectWorkflowTransitionRule } from './connectWorkflowTransitionRule';
import { WorkflowId } from './workflowId';

export interface WorkflowTransitionRules {
  workflowId: WorkflowId[];
  postFunctions: ConnectWorkflowTransitionRule[];
  conditions: ConnectWorkflowTransitionRule[];
  validators: ConnectWorkflowTransitionRule[];
}
