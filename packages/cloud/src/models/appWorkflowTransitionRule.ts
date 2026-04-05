import { z } from 'zod';
import { RuleConfigurationSchema } from '#/models/ruleConfiguration';
import { WorkflowTransitionSchema } from '#/models/workflowTransition';

/** A workflow transition rule. */
export const AppWorkflowTransitionRuleSchema = z.object({
  configuration: RuleConfigurationSchema,
  /** The ID of the transition rule. */
  id: z.string(),
  /** The key of the rule, as defined in the Connect or the Forge app descriptor. */
  key: z.string(),
  transition: WorkflowTransitionSchema.optional(),
});

export type AppWorkflowTransitionRule = z.infer<typeof AppWorkflowTransitionRuleSchema>;
