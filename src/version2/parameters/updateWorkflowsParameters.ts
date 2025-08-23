import { z } from 'zod';
import { WorkflowStatusUpdateSchema } from './workflowStatusUpdate';
import { WorkflowUpdateSchema } from './workflowUpdate';

export const UpdateWorkflowsParametersSchema = z.object({
  /** The statuses to associate with the workflows. */
  statuses: z.array(WorkflowStatusUpdateSchema).optional(),
  /** The details of the workflows to update. */
  workflows: z.array(WorkflowUpdateSchema).optional(),
});

export type UpdateWorkflowsParameters = z.infer<typeof UpdateWorkflowsParametersSchema>;
