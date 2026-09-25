import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { PreviewRuleConfigurationSchema, type PreviewRuleConfiguration } from './previewRuleConfiguration';

export interface PreviewConditionGroupConfiguration {
  /** The nested conditions of the condition group. */
  conditionGroups?: PreviewConditionGroupConfiguration[];
  /** The rules for this condition. */
  conditions?: PreviewRuleConfiguration[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation?: 'ANY' | 'ALL' | (string & {});
  [key: string]: unknown;
}

export interface PreviewConditionGroupConfigurationInput {
  /** The nested conditions of the condition group. */
  conditionGroups?: PreviewConditionGroupConfigurationInput[];
  /** The rules for this condition. */
  conditions?: z.input<typeof PreviewRuleConfigurationSchema>[];
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation?: 'ANY' | 'ALL' | (string & {});
}

/** Condition group configuration for workflow transitions. */
export const PreviewConditionGroupConfigurationSchema = apiObject({
  /** The nested conditions of the condition group. */
  conditionGroups: z
    .array(
      z.lazy(
        (): z.ZodType<PreviewConditionGroupConfiguration, PreviewConditionGroupConfigurationInput> =>
          PreviewConditionGroupConfigurationSchema,
      ) as z.ZodType<PreviewConditionGroupConfiguration, PreviewConditionGroupConfigurationInput>,
    )
    .optional(),
  /** The rules for this condition. */
  conditions: z.array(PreviewRuleConfigurationSchema).optional(),
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: openEnum(['ANY', 'ALL']).optional(),
}) satisfies z.ZodType<PreviewConditionGroupConfiguration, PreviewConditionGroupConfigurationInput>;
