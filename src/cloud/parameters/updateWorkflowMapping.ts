import { z } from 'zod';
import { IssueTypesWorkflowMappingSchema } from '../models';

export const UpdateWorkflowMappingSchema = z.object({}).extend(IssueTypesWorkflowMappingSchema.shape).extend({
  /** The ID of the workflow scheme. */
  id: z.number(),
  /** The name of the workflow. */
  workflowName: z.string(),
});

export type UpdateWorkflowMapping = z.input<typeof UpdateWorkflowMappingSchema>;
