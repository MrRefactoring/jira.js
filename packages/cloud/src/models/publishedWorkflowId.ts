import { z } from 'zod';

/** Properties that identify a published workflow. */
export const PublishedWorkflowIdSchema = z.object({
  /** The entity ID of the workflow. */
  entityId: z.string().optional(),
  /** The name of the workflow. */
  name: z.string(),
});

export type PublishedWorkflowId = z.infer<typeof PublishedWorkflowIdSchema>;
