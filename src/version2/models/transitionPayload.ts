import type { RulePayload } from './rulePayload';
import type { ConditionGroupPayload } from './conditionGroupPayload';
import type { FromLayoutPayload } from './fromLayoutPayload';
import type { ToLayoutPayload } from './toLayoutPayload';

/** The payload for creating a transition in a workflow. Can be DIRECTED, GLOBAL, SELF-LOOPED, GLOBAL LOOPED */
export interface TransitionPayload {
  /** The actions that are performed when the transition is made */
  actions?: RulePayload[];
  conditions?: ConditionGroupPayload;
  /**
   * Mechanism in Jira for triggering certain actions, like notifications, automations, etc. Unless a custom
   * notification scheme is configure, it's better not to provide any value here
   */
  customIssueEventId?: string;
  /** The description of the transition */
  description?: string;
  /** The statuses that the transition can be made from */
  from?: FromLayoutPayload[];
  /** The id of the transition */
  id?: number;
  /** The name of the transition */
  name?: string;
  /** The properties of the transition */
  properties?: {};
  to?: ToLayoutPayload;
  transitionScreen?: RulePayload;
  /** The triggers that are performed when the transition is made */
  triggers?: RulePayload[];
  /** The type of the transition */
  type?: 'global' | 'initial' | 'directed' | string;
  /** The validators that are performed when the transition is made */
  validators?: RulePayload[];
}
