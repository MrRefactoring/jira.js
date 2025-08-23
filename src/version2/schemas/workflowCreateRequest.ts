import { z } from 'zod';
import { WorkflowScopeSchema } from './workflowScope';
import { WorkflowStatusUpdateSchema } from './workflowStatusUpdate';
import { WorkflowCreateSchema } from './workflowCreate';

/** The create workflows payload. */
export const WorkflowCreateRequestSchema = z.object({
  scope: WorkflowScopeSchema.optional(),
  /** The statuses to associate with the workflows. */
  statuses: z.array(WorkflowStatusUpdateSchema).optional(),
  /** The details of the workflows to create. */
  workflows: z.array(WorkflowCreateSchema).optional(),
});

export type WorkflowCreateRequest = z.infer<typeof WorkflowCreateRequestSchema>;
