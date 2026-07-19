import { z } from 'zod';
import { IssueTypesWorkflowMappingSchema } from '../models';

export const UpdateDraftWorkflowMappingSchema = z
  .object({
    /** The ID of the workflow scheme that the draft belongs to. */
    id: z.number(),
    /** The name of the workflow. */
    workflowName: z.string(),
  })
  .extend(IssueTypesWorkflowMappingSchema.shape);

export type UpdateDraftWorkflowMapping = z.input<typeof UpdateDraftWorkflowMappingSchema>;
