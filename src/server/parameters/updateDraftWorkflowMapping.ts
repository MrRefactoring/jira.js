import { z } from 'zod';
import { WorkflowMappingSchema } from '../models';

export const UpdateDraftWorkflowMappingSchema = z.object(WorkflowMappingSchema.shape).extend({
  /** The name of the workflow mapping to update. */
  workflowName: z.string().optional(),
  /** The id of the parent scheme. */
  id: z.number(),
});

export type UpdateDraftWorkflowMapping = z.input<typeof UpdateDraftWorkflowMappingSchema>;
