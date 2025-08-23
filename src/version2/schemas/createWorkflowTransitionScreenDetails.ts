import { z } from 'zod';

/** The details of a transition screen. */
export const CreateWorkflowTransitionScreenDetailsSchema = z.object({
  /** The ID of the screen. */
  id: z.string(),
});

export type CreateWorkflowTransitionScreenDetails = z.infer<typeof CreateWorkflowTransitionScreenDetailsSchema>;
