import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowConditionSchema, type WorkflowCondition, type WorkflowConditionInput } from './workflowCondition';
import { WorkflowTransitionRuleSchema } from './workflowTransitionRule';

/** A collection of transition rules. */
export const WorkflowRulesSchema = apiObject({
  conditionsTree: (WorkflowConditionSchema as z.ZodType<WorkflowCondition, WorkflowConditionInput>).optional(),
  /** The workflow post functions. */
  postFunctions: z.array(WorkflowTransitionRuleSchema).optional(),
  /** The workflow validators. */
  validators: z.array(WorkflowTransitionRuleSchema).optional(),
});

export type WorkflowRules = z.infer<typeof WorkflowRulesSchema>;
