import { z } from 'zod';

/** Properties that identify a workflow. */
export const WorkflowIdSchema = z.object({
  /**
   * **Deprecated:** Whether the workflow is in the draft state. The 'draft' parameter will be removed from this API on
   * [November 2, 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3147).
   */
  draft: z.boolean().optional(),
  /** The name of the workflow. */
  name: z.string(),
});

export type WorkflowId = z.infer<typeof WorkflowIdSchema>;
