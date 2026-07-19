import { z } from 'zod';

export const GetDraftDefaultWorkflowSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number(),
});

export type GetDraftDefaultWorkflow = z.input<typeof GetDraftDefaultWorkflowSchema>;
