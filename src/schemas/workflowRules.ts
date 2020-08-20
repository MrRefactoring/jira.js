import { WorkflowTransitionRule } from './workflowTransitionRule';

export interface WorkflowRules {
    conditions: WorkflowTransitionRule[];
    validators: WorkflowTransitionRule[];
    postFunctions: WorkflowTransitionRule[];
}
