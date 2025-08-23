import { z } from 'zod';

/** The trigger configuration associated with a workflow. */
export const WorkflowTriggerSchema = z.object({
  /** The ID of the trigger. */
  id: z.string().optional(),
  /** The parameters of the trigger. */
  parameters: z.object({}),
  /** The rule key of the trigger. */
  ruleKey: z.string(),
});

export type WorkflowTrigger = z.infer<typeof WorkflowTriggerSchema>;
