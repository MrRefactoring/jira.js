import { z } from 'zod';
import { WorkflowStatusUpdateSchema } from '#/models/workflowStatusUpdate';
import { WorkflowUpdateSchema } from '#/models/workflowUpdate';

/** The update workflows payload. */
export const WorkflowUpdateRequestSchema = z.object({
  /** The statuses to associate with the workflows. */
  statuses: z.array(WorkflowStatusUpdateSchema).optional(),
  /** The details of the workflows to update. */
  workflows: z.array(WorkflowUpdateSchema).optional(),
});

export type WorkflowUpdateRequest = z.infer<typeof WorkflowUpdateRequestSchema>;
