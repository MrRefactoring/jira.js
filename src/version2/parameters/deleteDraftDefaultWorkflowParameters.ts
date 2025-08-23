import { z } from 'zod';

export const DeleteDraftDefaultWorkflowParametersSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number().int(),
});

export type DeleteDraftDefaultWorkflowParameters = z.infer<typeof DeleteDraftDefaultWorkflowParametersSchema>;
