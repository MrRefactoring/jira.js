import { z } from 'zod';

export const DeleteDraftWorkflowMappingSchema = z.object({
  /** The name of the workflow to delete. */
  workflowName: z.string().optional(),
  /** The id of the parent scheme. */
  id: z.number(),
});

export type DeleteDraftWorkflowMapping = z.input<typeof DeleteDraftWorkflowMappingSchema>;
