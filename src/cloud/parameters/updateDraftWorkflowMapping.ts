import { z } from 'zod';
import { IssueTypesWorkflowMappingSchema } from '../models';

export const UpdateDraftWorkflowMappingSchema = z.object({}).extend(IssueTypesWorkflowMappingSchema.shape).extend({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number(),
  /** The name of the workflow. */
  workflowName: z.string(),
});

export type UpdateDraftWorkflowMapping = z.input<typeof UpdateDraftWorkflowMappingSchema>;
