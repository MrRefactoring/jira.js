import { z } from 'zod';
import { IssueTypesWorkflowMappingSchema } from '../models';

export const UpdateWorkflowMappingSchema = z
  .object({
    /** The ID of the workflow scheme. */
    id: z.number(),
    /** The name of the workflow. */
    workflowName: z.string(),
  })
  .extend(IssueTypesWorkflowMappingSchema.shape);

export type UpdateWorkflowMapping = z.input<typeof UpdateWorkflowMappingSchema>;
