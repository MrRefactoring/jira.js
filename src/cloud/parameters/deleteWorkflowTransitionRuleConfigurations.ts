import { z } from 'zod';
import { WorkflowsWithTransitionRulesDetailsSchema } from '../models';

export const DeleteWorkflowTransitionRuleConfigurationsSchema = z
  .object({})
  .extend(WorkflowsWithTransitionRulesDetailsSchema.shape);

export type DeleteWorkflowTransitionRuleConfigurations = z.input<
  typeof DeleteWorkflowTransitionRuleConfigurationsSchema
>;
