import type { WorkflowRuleConfiguration } from './workflowRuleConfiguration';
import type { ConditionGroupConfiguration } from './conditionGroupConfiguration';
import type { WorkflowStatusAndPort } from './workflowStatusAndPort';
import type { WorkflowTransitionLinks } from './workflowTransitionLinks';
import type { WorkflowTrigger } from './workflowTrigger';

/**
 * The transitions of the workflow. Note that a transition can have either the deprecated `to`/`from` fields or the
 * `toStatusReference`/`links` fields, but never both nor a combination.
 */
export interface WorkflowTransitions {
  /** The post-functions of the transition. */
  actions?: WorkflowRuleConfiguration[];
  conditions?: ConditionGroupConfiguration;
  /** The custom event ID of the transition. */
  customIssueEventId?: string;
  /** The description of the transition. */
  description?: string;
  /**
   * The statuses and ports that the transition can start from. This field is deprecated - use
   * `toStatusReference`/`links` instead.
   */
  from?: WorkflowStatusAndPort[];
  /** The ID of the transition. */
  id?: string;
  /** The statuses the transition can start from, and the mapping of ports between the statuses. */
  links?: WorkflowTransitionLinks[];
  /** The name of the transition. */
  name?: string;
  /** The properties of the transition. */
  properties?: unknown;
  to?: WorkflowStatusAndPort;
  /** The status the transition goes to. */
  toStatusReference?: string;
  transitionScreen?: WorkflowRuleConfiguration;
  /** The triggers of the transition. */
  triggers?: WorkflowTrigger[];
  /** The transition type. */
  type?: 'INITIAL' | 'GLOBAL' | 'DIRECTED' | string;
  /** The validators of the transition. */
  validators?: WorkflowRuleConfiguration[];
}
