import type { RuleConfiguration } from './ruleConfiguration.js';
import type { WorkflowTransition } from './workflowTransition.js';

/** A workflow transition rule. */
export interface ConnectWorkflowTransitionRule {
  configuration: RuleConfiguration;
  /** The ID of the transition rule. */
  id: string;
  /** The key of the rule, as defined in the Connect app descriptor. */
  key: string;
  transition?: WorkflowTransition;
}
