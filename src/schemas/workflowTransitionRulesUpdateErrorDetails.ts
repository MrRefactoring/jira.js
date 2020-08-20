import { WorkflowId } from './workflowId';

export interface WorkflowTransitionRulesUpdateErrorDetails {
    workflowId?: WorkflowId[];
    ruleUpdateErrors: {
        [key: string]: any;
    };
    updateErrors?: string[];
}
