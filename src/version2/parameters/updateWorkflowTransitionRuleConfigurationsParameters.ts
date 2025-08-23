import { z } from 'zod';
import { WorkflowTransitionRulesSchema } from './workflowTransitionRules';

export const UpdateWorkflowTransitionRuleConfigurationsParametersSchema = z.object({
  /** The list of workflows with transition rules to update. */
  workflows: z.array(WorkflowTransitionRulesSchema),
});

export type UpdateWorkflowTransitionRuleConfigurationsParameters = z.infer<
  typeof UpdateWorkflowTransitionRuleConfigurationsParametersSchema
>;
