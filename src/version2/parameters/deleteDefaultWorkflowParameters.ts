import { z } from 'zod';

export const DeleteDefaultWorkflowParametersSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.number().int(),
  /**
   * Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the
   * workflow scheme cannot be edited. Defaults to `false`.
   */
  updateDraftIfNeeded: z.boolean().optional(),
});

export type DeleteDefaultWorkflowParameters = z.infer<typeof DeleteDefaultWorkflowParametersSchema>;
