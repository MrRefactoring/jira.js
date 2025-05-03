import type { RulePayload } from './rulePayload';

/** The payload for creating a condition group in a workflow */
export interface ConditionGroupPayload {
  /** The nested conditions of the condition group. */
  conditionGroup?: ConditionGroupPayload[];
  /** The rules for this condition. */
  conditions?: RulePayload[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation?: 'ANY' | 'ALL' | string;
}
