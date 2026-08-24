import { z } from 'zod';

export const DeleteWorkflowMappingSchema = z.object({
  /** Flag to indicate if a draft should be created if necessary to delete the workflow from the scheme. */
  updateDraftIfNeeded: z.boolean().optional(),
  /** The name of the workflow to delete. */
  workflowName: z.string().optional(),
  /** The id of the scheme. */
  id: z.number(),
});

export type DeleteWorkflowMapping = z.input<typeof DeleteWorkflowMappingSchema>;
