import { z } from 'zod';
import { WorkflowsWithTransitionRulesDetailsSchema } from '../models';

export const DeleteWorkflowTransitionRuleConfigurationsSchema = z.object(
  WorkflowsWithTransitionRulesDetailsSchema.shape,
);

export type DeleteWorkflowTransitionRuleConfigurations = z.input<
  typeof DeleteWorkflowTransitionRuleConfigurationsSchema
>;
