import { z } from 'zod';
import { AppWorkflowTransitionRuleSchema } from '#/models/appWorkflowTransitionRule';
import { WorkflowIdSchema } from '#/models/workflowId';

/** A workflow with transition rules. */
export const WorkflowTransitionRulesSchema = z.object({
  /** The list of conditions within the workflow. */
  conditions: z.array(AppWorkflowTransitionRuleSchema).optional(),
  /** The list of post functions within the workflow. */
  postFunctions: z.array(AppWorkflowTransitionRuleSchema).optional(),
  /** The list of validators within the workflow. */
  validators: z.array(AppWorkflowTransitionRuleSchema).optional(),
  workflowId: WorkflowIdSchema,
});

export type WorkflowTransitionRules = z.infer<typeof WorkflowTransitionRulesSchema>;
