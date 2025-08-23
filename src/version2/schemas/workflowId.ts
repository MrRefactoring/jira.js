import { z } from 'zod';

/** Properties that identify a workflow. */
export const WorkflowIdSchema = z.object({
  /** Whether the workflow is in the draft state. */
  draft: z.boolean(),
  /** The name of the workflow. */
  name: z.string(),
});

export type WorkflowId = z.infer<typeof WorkflowIdSchema>;
