import { ConditionGroupConfiguration } from './conditionGroupConfiguration.mjs';
import { WorkflowRuleConfiguration } from './workflowRuleConfiguration.mjs';
import { WorkflowStatusAndPort } from './workflowStatusAndPort.mjs';
import { WorkflowTrigger } from './workflowTrigger.mjs';

/** The transitions of the workflow. */
export interface WorkflowTransitions {
  /** The post-functions of the transition. */
  actions?: WorkflowRuleConfiguration[];
  conditions?: ConditionGroupConfiguration;
  /** The custom event ID of the transition. */
  customIssueEventId?: string;
  /** The description of the transition. */
  description?: string;
  /** The statuses the transition can start from. */
  from?: WorkflowStatusAndPort[];
  /** The ID of the transition. */
  id?: string;
  /** The name of the transition. */
  name?: string;
  /** The properties of the transition. */
  properties?: {};
  to?: WorkflowStatusAndPort;
  transitionScreen?: WorkflowRuleConfiguration;
  /** The triggers of the transition. */
  triggers?: WorkflowTrigger[];
  /** The transition type. */
  type?: string;
  /** The validators of the transition. */
  validators?: WorkflowRuleConfiguration[];
}
