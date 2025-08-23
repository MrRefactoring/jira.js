import { z } from 'zod';
import { RuleConfigurationSchema } from './ruleConfiguration';

/** A workflow transition rule. */
export const AppWorkflowTransitionRuleSchema = z.object({
  configuration: RuleConfigurationSchema,
  /** The ID of the transition rule. */
  id: z.string(),
  /** The key of the rule, as defined in the Connect or the Forge app descriptor. */
  key: z.string(),
  transition: z.unknown().optional(),
});

export type AppWorkflowTransitionRule = z.infer<typeof AppWorkflowTransitionRuleSchema>;
