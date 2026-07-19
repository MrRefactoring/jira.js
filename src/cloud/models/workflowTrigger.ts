import { z } from 'zod';
import { apiObject } from '#/core';
/** The trigger configuration associated with a workflow. */

export const WorkflowTriggerSchema = apiObject({
  /** The ID of the trigger. */
  id: z.string().optional(),
  /** The parameters of the trigger. */
  parameters: z.record(z.string(), z.any()),
  /** The rule key of the trigger. */
  ruleKey: z.string(),
});

export type WorkflowTrigger = z.infer<typeof WorkflowTriggerSchema>;
