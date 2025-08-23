import { z } from 'zod';
import { WorkflowTransitionRulesSchema } from './workflowTransitionRules';

/** Details of workflow transition rules. */
export const WorkflowRulesSearchDetailsSchema = z.object({
  /** List of workflow rule IDs that do not belong to the workflow or can not be found. */
  invalidRules: z.array(z.string()).optional(),
  /** List of valid workflow transition rules. */
  validRules: z.array(WorkflowTransitionRulesSchema).optional(),
  /** The workflow ID. */
  workflowEntityId: z.string().optional(),
});

export type WorkflowRulesSearchDetails = z.infer<typeof WorkflowRulesSearchDetailsSchema>;
