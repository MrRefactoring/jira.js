import { z } from 'zod';
import { WorkflowConditionSchema } from '#/models/workflowCondition';
import { WorkflowTransitionRuleSchema } from '#/models/workflowTransitionRule';

/** A collection of transition rules. */
export const WorkflowRulesSchema = z.object({
  conditionsTree: WorkflowConditionSchema.optional(),
  /** The workflow post functions. */
  postFunctions: z.array(WorkflowTransitionRuleSchema).optional(),
  /** The workflow validators. */
  validators: z.array(WorkflowTransitionRuleSchema).optional(),
});

export type WorkflowRules = z.infer<typeof WorkflowRulesSchema>;
