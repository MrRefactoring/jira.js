import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowTransitionRulesSchema } from './workflowTransitionRules';
/** Details about a workflow configuration update request. */

export const WorkflowTransitionRulesUpdateSchema = apiObject({
  /** The list of workflows with transition rules to update. */
  workflows: z.array(WorkflowTransitionRulesSchema),
});

export type WorkflowTransitionRulesUpdate = z.infer<typeof WorkflowTransitionRulesUpdateSchema>;
