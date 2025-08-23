import { z } from 'zod';

/** The configuration of the rule. */
export const WorkflowRuleConfigurationSchema = z.object({
  /** The ID of the rule. */
  id: z.string().optional(),
  /** The parameters related to the rule. */
  parameters: z.object({}).optional(),
  /** The rule key of the rule. */
  ruleKey: z.string(),
});

export type WorkflowRuleConfiguration = z.infer<typeof WorkflowRuleConfigurationSchema>;
