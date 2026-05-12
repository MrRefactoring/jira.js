import { z } from 'zod';
import { WorkflowTransitionRulesUpdateSchema } from '../models';

export const UpdateWorkflowTransitionRuleConfigurationsSchema = z
  .object({})
  .extend(WorkflowTransitionRulesUpdateSchema.shape);

export type UpdateWorkflowTransitionRuleConfigurations = z.input<
  typeof UpdateWorkflowTransitionRuleConfigurationsSchema
>;
