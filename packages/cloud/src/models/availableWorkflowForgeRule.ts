import { z } from 'zod';

/** The Forge provided ecosystem rules available. */
export const AvailableWorkflowForgeRuleSchema = z.object({
  /** The rule description. */
  description: z.string().optional(),
  /** The unique ARI of the forge rule type. */
  id: z.string().optional(),
  /** The rule name. */
  name: z.string().optional(),
  /** The rule key. */
  ruleKey: z.string().optional(),
  /** The rule type. */
  ruleType: z.enum(['Condition', 'Validator', 'Function', 'Screen']).optional(),
});

export type AvailableWorkflowForgeRule = z.infer<typeof AvailableWorkflowForgeRuleSchema>;
