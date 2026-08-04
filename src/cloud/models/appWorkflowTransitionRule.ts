import { z } from 'zod';
import { apiObject } from '#/core';
import { RuleConfigurationSchema } from './ruleConfiguration';
import { WorkflowTransitionSchema } from './workflowTransition';
/** A workflow transition rule. */

export const AppWorkflowTransitionRuleSchema = apiObject({
  configuration: RuleConfigurationSchema,
  /** The ID of the transition rule. */
  id: z.string(),
  /** The key of the rule, as defined in the Connect or the Forge app descriptor. */
  key: z.string(),
  transition: WorkflowTransitionSchema.optional(),
});

export type AppWorkflowTransitionRule = z.infer<typeof AppWorkflowTransitionRuleSchema>;
