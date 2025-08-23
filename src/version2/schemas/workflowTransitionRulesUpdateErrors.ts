import { z } from 'zod';
import { WorkflowTransitionRulesUpdateErrorDetailsSchema } from './workflowTransitionRulesUpdateErrorDetails';

/** Details of any errors encountered while updating workflow transition rules. */
export const WorkflowTransitionRulesUpdateErrorsSchema = z.object({
  /** A list of workflows. */
  updateResults: z.array(WorkflowTransitionRulesUpdateErrorDetailsSchema),
});

export type WorkflowTransitionRulesUpdateErrors = z.infer<typeof WorkflowTransitionRulesUpdateErrorsSchema>;
