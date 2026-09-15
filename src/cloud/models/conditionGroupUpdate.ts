import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { WorkflowRuleConfigurationSchema, type WorkflowRuleConfiguration } from './workflowRuleConfiguration';

export interface ConditionGroupUpdate {
  /** The nested conditions of the condition group. */
  conditionGroups?: ConditionGroupUpdate[];
  /** The rules for this condition. */
  conditions?: WorkflowRuleConfiguration[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: 'ANY' | 'ALL' | (string & {});
  [key: string]: unknown;
}

export interface ConditionGroupUpdateInput {
  /** The nested conditions of the condition group. */
  conditionGroups?: ConditionGroupUpdateInput[];
  /** The rules for this condition. */
  conditions?: z.input<typeof WorkflowRuleConfigurationSchema>[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: 'ANY' | 'ALL' | (string & {});
}

/** The conditions group associated with the transition. */
export const ConditionGroupUpdateSchema: z.ZodType<ConditionGroupUpdate, ConditionGroupUpdateInput> = apiObject({
  /** The nested conditions of the condition group. */
  conditionGroups: z.array(z.lazy(() => ConditionGroupUpdateSchema)).optional(),
  /** The rules for this condition. */
  conditions: z.array(WorkflowRuleConfigurationSchema).optional(),
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: openEnum(['ANY', 'ALL']),
});
