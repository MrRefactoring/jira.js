import { ConditionGroupUpdate } from './conditionGroupUpdate';
import { StatusReferenceAndPort } from './statusReferenceAndPort';
import { WorkflowRuleConfiguration } from './workflowRuleConfiguration';
import { WorkflowTrigger } from './workflowTrigger';

/** The transitions of this workflow. */
export interface TransitionUpdateDTO {
  /** The post-functions of the transition. */
  actions?: WorkflowRuleConfiguration[];
  conditions?: ConditionGroupUpdate;
  /** The custom event ID of the transition. */
  customIssueEventId?: string;
  /** The description of the transition. */
  description?: string;
  /** The statuses the transition can start from. */
  from?: StatusReferenceAndPort[];
  /** The ID of the transition. */
  id: string;
  /** The name of the transition. */
  name: string;
  /** The properties of the transition. */
  properties?: {};
  to?: StatusReferenceAndPort;
  transitionScreen?: WorkflowRuleConfiguration;
  /** The triggers of the transition. */
  triggers?: WorkflowTrigger[];
  /** The transition type. */
  type: string;
  /** The validators of the transition. */
  validators?: WorkflowRuleConfiguration[];
}
