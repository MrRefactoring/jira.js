import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** The Atlassian provided system rules available. */

export const AvailableWorkflowSystemRuleSchema = apiObject({
  /** The rule description. */
  description: z.string(),
  /** List of rules that conflict with this one. */
  incompatibleRuleKeys: z.array(z.string()),
  /** Whether the rule can be added added to an initial transition. */
  isAvailableForInitialTransition: z.boolean(),
  /** Whether the rule is visible. */
  isVisible: z.boolean(),
  /** The rule name. */
  name: z.string(),
  /** The rule key. */
  ruleKey: z.string(),
  /** The rule type. */
  ruleType: openEnum(['Condition', 'Validator', 'Function', 'Screen']),
});

export type AvailableWorkflowSystemRule = z.infer<typeof AvailableWorkflowSystemRuleSchema>;
