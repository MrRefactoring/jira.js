import { z } from 'zod';
import { WorkflowMappingSchema } from '../models';

export const UpdateWorkflowMappingSchema = z.object(WorkflowMappingSchema.shape).extend({
  /** The name of the workflow mapping to update. */
  workflowName: z.string().optional(),
  /** The id of the scheme. */
  id: z.number(),
});

export type UpdateWorkflowMapping = z.input<typeof UpdateWorkflowMappingSchema>;
