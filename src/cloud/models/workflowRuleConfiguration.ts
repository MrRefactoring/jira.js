import { z } from 'zod';
import { apiObject } from '#/core';
/** The configuration of the rule. */

export const WorkflowRuleConfigurationSchema = apiObject({
  /** The ID of the rule. */
  id: z.string().nullish(),
  /** The parameters related to the rule. */
  parameters: z.record(z.string(), z.any()).optional(),
  /** The rule key of the rule. */
  ruleKey: z.string(),
});

export type WorkflowRuleConfiguration = z.infer<typeof WorkflowRuleConfigurationSchema>;
