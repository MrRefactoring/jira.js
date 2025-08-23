import { z } from 'zod';

/** A workflow transition. */
export const WorkflowTransitionSchema = z.object({
  /** The transition ID. */
  id: z.number().int(),
  /** The transition name. */
  name: z.string(),
});

export type WorkflowTransition = z.infer<typeof WorkflowTransitionSchema>;
