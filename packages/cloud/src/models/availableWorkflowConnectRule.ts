import { z } from 'zod';

/** The Connect provided ecosystem rules available. */
export const AvailableWorkflowConnectRuleSchema = z.object({
  /** The add-on providing the rule. */
  addonKey: z.string().optional(),
  /** The URL creation path segment defined in the Connect module. */
  createUrl: z.string().optional(),
  /** The rule description. */
  description: z.string().optional(),
  /** The URL edit path segment defined in the Connect module. */
  editUrl: z.string().optional(),
  /** The module providing the rule. */
  moduleKey: z.string().optional(),
  /** The rule name. */
  name: z.string().optional(),
  /** The rule key. */
  ruleKey: z.string().optional(),
  /** The rule type. */
  ruleType: z.enum(['Condition', 'Validator', 'Function', 'Screen']).optional(),
  /** The URL view path segment defined in the Connect module. */
  viewUrl: z.string().optional(),
});

export type AvailableWorkflowConnectRule = z.infer<typeof AvailableWorkflowConnectRuleSchema>;
