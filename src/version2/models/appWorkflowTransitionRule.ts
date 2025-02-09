import { RuleConfiguration } from './ruleConfiguration';
import { WorkflowTransition } from './workflowTransition';

/** A workflow transition rule. */
export interface AppWorkflowTransitionRule {
  configuration: RuleConfiguration;
  /** The ID of the transition rule. */
  id: string;
  /** The key of the rule, as defined in the Connect or the Forge app descriptor. */
  key: string;
  transition?: WorkflowTransition;
}
