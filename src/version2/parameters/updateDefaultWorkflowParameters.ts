import { z } from 'zod';

export const UpdateDefaultWorkflowParametersSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.number().int(),
  /**
   * Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated
   * with the new default workflow. Defaults to `false`.
   */
  updateDraftIfNeeded: z.boolean().optional(),
  /** The name of the workflow to set as the default workflow. */
  workflow: z.string(),
});

export type UpdateDefaultWorkflowParameters = z.infer<typeof UpdateDefaultWorkflowParametersSchema>;
