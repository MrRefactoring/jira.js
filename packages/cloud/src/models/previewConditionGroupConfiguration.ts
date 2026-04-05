import { z } from 'zod';
import { PreviewRuleConfigurationSchema, type PreviewRuleConfiguration } from '#/models/previewRuleConfiguration';

export type PreviewConditionGroupConfiguration = {
  conditionGroups?: PreviewConditionGroupConfiguration[];
  conditions?: PreviewRuleConfiguration[];
  operation?: 'ANY' | 'ALL';
};

/** Condition group configuration for workflow transitions. */
export const PreviewConditionGroupConfigurationSchema: z.ZodType<PreviewConditionGroupConfiguration> = z.object({
  /** The nested conditions of the condition group. */
  conditionGroups: z.array(z.lazy(() => PreviewConditionGroupConfigurationSchema)).optional(),
  /** The rules for this condition. */
  conditions: z.array(PreviewRuleConfigurationSchema).optional(),
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: z.enum(['ANY', 'ALL']).optional(),
});
