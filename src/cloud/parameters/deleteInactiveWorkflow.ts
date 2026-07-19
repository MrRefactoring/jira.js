import { z } from 'zod';

export const DeleteInactiveWorkflowSchema = z.object({
  /** The entity ID of the workflow. */
  entityId: z.string(),
});

export type DeleteInactiveWorkflow = z.input<typeof DeleteInactiveWorkflowSchema>;
