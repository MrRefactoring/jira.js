import { z } from 'zod';
import { WorkflowRuleConfigurationSchema, type WorkflowRuleConfiguration } from '#/models/workflowRuleConfiguration';

export type ConditionGroupUpdate = {
  conditionGroups?: ConditionGroupUpdate[];
  conditions?: WorkflowRuleConfiguration[];
  operation: 'ANY' | 'ALL';
};

/** The conditions group associated with the transition. */
export const ConditionGroupUpdateSchema: z.ZodType<ConditionGroupUpdate> = z.object({
  /** The nested conditions of the condition group. */
  conditionGroups: z.array(z.lazy(() => ConditionGroupUpdateSchema)).optional(),
  /** The rules for this condition. */
  conditions: z.array(WorkflowRuleConfigurationSchema).optional(),
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: z.enum(['ANY', 'ALL']),
});
