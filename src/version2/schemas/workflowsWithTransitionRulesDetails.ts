import { z } from 'zod';
import { WorkflowTransitionRulesDetailsSchema } from './workflowTransitionRulesDetails';

/** Details of workflows and their transition rules to delete. */
export const WorkflowsWithTransitionRulesDetailsSchema = z.object({
  /** The list of workflows with transition rules to delete. */
  workflows: z.array(WorkflowTransitionRulesDetailsSchema),
});

export type WorkflowsWithTransitionRulesDetails = z.infer<typeof WorkflowsWithTransitionRulesDetailsSchema>;
