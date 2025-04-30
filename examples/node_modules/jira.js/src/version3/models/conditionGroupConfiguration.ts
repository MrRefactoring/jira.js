import type { WorkflowRuleConfiguration } from './workflowRuleConfiguration';

/** The conditions group associated with the transition. */
export interface ConditionGroupConfiguration {
  /** The nested conditions of the condition group. */
  conditionGroups?: ConditionGroupConfiguration[];
  /** The rules for this condition. */
  conditions?: WorkflowRuleConfiguration[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation?: 'ANY' | 'ALL' | string;
}
