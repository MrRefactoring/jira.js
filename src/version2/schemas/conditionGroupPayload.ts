import { z } from 'zod';
import { ConditionGroupPayloadSchema } from './conditionGroupPayload';
import { RulePayloadSchema } from './rulePayload';

/** The payload for creating a condition group in a workflow */
export const ConditionGroupPayloadSchema = z.object({
  /** The nested conditions of the condition group. */
  conditionGroup: z.array(ConditionGroupPayloadSchema).optional(),
  /** The rules for this condition. */
  conditions: z.array(RulePayloadSchema).optional(),
  /**
   * Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least
   * one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the
   * group must be true for the group to evaluate to true.
   */
  operation: z.enum(['ANY', 'ALL']).optional(),
});

export type ConditionGroupPayload = z.infer<typeof ConditionGroupPayloadSchema>;
