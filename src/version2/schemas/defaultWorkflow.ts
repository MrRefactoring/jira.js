import { z } from 'zod';

/** Details about the default workflow. */
export const DefaultWorkflowSchema = z.object({
  /**
   * Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated
   * with the new default workflow. Defaults to `false`.
   */
  updateDraftIfNeeded: z.boolean().optional(),
  /** The name of the workflow to set as the default workflow. */
  workflow: z.string(),
});

export type DefaultWorkflow = z.infer<typeof DefaultWorkflowSchema>;
