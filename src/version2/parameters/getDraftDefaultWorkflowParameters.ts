import { z } from 'zod';

export const GetDraftDefaultWorkflowParametersSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number().int(),
});

export type GetDraftDefaultWorkflowParameters = z.infer<typeof GetDraftDefaultWorkflowParametersSchema>;
