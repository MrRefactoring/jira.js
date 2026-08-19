import { z } from 'zod';
import { WorkflowTransitionRulesUpdateSchema } from '../models';

export const UpdateWorkflowTransitionRuleConfigurationsSchema = z.object(WorkflowTransitionRulesUpdateSchema.shape);

export type UpdateWorkflowTransitionRuleConfigurations = z.input<
  typeof UpdateWorkflowTransitionRuleConfigurationsSchema
>;
