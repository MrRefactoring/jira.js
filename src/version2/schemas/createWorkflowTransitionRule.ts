import { z } from 'zod';

/** A workflow transition rule. */
export const CreateWorkflowTransitionRuleSchema = z.object({
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration: z.object({}).optional(),
  /** The type of the transition rule. */
  type: z.string(),
});

export type CreateWorkflowTransitionRule = z.infer<typeof CreateWorkflowTransitionRuleSchema>;
