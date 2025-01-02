import { RuleConfiguration } from './ruleConfiguration.mjs';
import { WorkflowTransition } from './workflowTransition.mjs';

/** A workflow transition rule. */
export interface ConnectWorkflowTransitionRule {
  /** The ID of the transition rule. */
  id: string;
  /** The key of the rule, as defined in the Connect app descriptor. */
  key: string;
  configuration: RuleConfiguration;
  transition?: WorkflowTransition;
}
