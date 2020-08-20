import { RuleConfiguration } from './ruleConfiguration';
import { WorkflowTransition } from './workflowTransition';

export interface ConnectWorkflowTransitionRule {
    id: string;
    key: string;
    configuration?: RuleConfiguration[];
    transition?: WorkflowTransition[];
}
