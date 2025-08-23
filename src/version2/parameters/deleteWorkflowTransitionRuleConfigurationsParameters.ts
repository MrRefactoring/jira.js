import { z } from 'zod';
import { WorkflowTransitionRulesDetailsSchema } from './workflowTransitionRulesDetails';

export const DeleteWorkflowTransitionRuleConfigurationsParametersSchema = z.object({
  /** The list of workflows with transition rules to delete. */
  workflows: z.array(WorkflowTransitionRulesDetailsSchema),
});

export type DeleteWorkflowTransitionRuleConfigurationsParameters = z.infer<
  typeof DeleteWorkflowTransitionRuleConfigurationsParametersSchema
>;
