import { z } from 'zod';

export const DeleteDraftDefaultWorkflowSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number(),
});

export type DeleteDraftDefaultWorkflow = z.input<typeof DeleteDraftDefaultWorkflowSchema>;
