import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowIdSchema } from './workflowId';
/** Details about a workflow configuration update request. */

export const WorkflowTransitionRulesDetailsSchema = apiObject({
  workflowId: WorkflowIdSchema,
  /** The list of connect workflow rule IDs. */
  workflowRuleIds: z.array(z.string()),
});

export type WorkflowTransitionRulesDetails = z.infer<typeof WorkflowTransitionRulesDetailsSchema>;
