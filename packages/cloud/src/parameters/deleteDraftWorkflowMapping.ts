import { z } from 'zod';

export const DeleteDraftWorkflowMappingSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number(),
  /** The name of the workflow. */
  workflowName: z.string(),
});

export type DeleteDraftWorkflowMapping = z.input<typeof DeleteDraftWorkflowMappingSchema>;
