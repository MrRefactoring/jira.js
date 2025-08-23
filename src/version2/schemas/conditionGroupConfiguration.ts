import { z } from 'zod';
import { ConditionGroupConfigurationSchema } from './conditionGroupConfiguration';
import { WorkflowRuleConfigurationSchema } from './workflowRuleConfiguration';

/** The conditions group associated with the transition. */
export const ConditionGroupConfigurationSchema = z.object({
  /** The nested conditions of the condition group. */
  conditionGroups: z.array(ConditionGroupConfigurationSchema).optional(),
  /** The rules for this condition. */
  conditions: z.array(WorkflowRuleConfigurationSchema).optional(),
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: z.enum(['ANY', 'ALL']).optional(),
});

export type ConditionGroupConfiguration = z.infer<typeof ConditionGroupConfigurationSchema>;
