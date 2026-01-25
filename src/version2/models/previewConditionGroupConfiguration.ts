import type { PreviewRuleConfiguration } from './previewRuleConfiguration';

/** Condition group configuration for workflow transitions. */
export interface PreviewConditionGroupConfiguration {
  /** The nested conditions of the condition group. */
  conditionGroups?: PreviewConditionGroupConfiguration[];
  /** The rules for this condition. */
  conditions?: PreviewRuleConfiguration[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`.
   *
   * - If `ANY` is used, at least one condition in the group must be true for the group to evaluate to true.
   * - If `ALL` is used, all conditions in the group must be true for the group to evaluate to true.
   */
  operation?: 'ANY' | 'ALL' | string;
}
