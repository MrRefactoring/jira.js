import { z } from 'zod';

/** The details of the preview workflow request. */
export const WorkflowPreviewRequestSchema = z.object({
  /** The list of issue type IDs. At most 25 issue type IDs can be specified. */
  issueTypeIds: z.array(z.string()).optional(),
  /**
   * The projectId parameter is required and will be used for permission checks. In addition, you must supply at least
   * one of the following lookup terms: _workflowNames_, _workflowIds_, or _issueTypeIds_. The specified workflows must
   * be associated with the given project.
   */
  projectId: z.string(),
  /** The list of workflow IDs to be returned. At most 25 workflow IDs can be specified. */
  workflowIds: z.array(z.string()).optional(),
  /** The list of workflow names to be returned. At most 25 workflow names can be specified. */
  workflowNames: z.array(z.string()).optional(),
});

export type WorkflowPreviewRequest = z.infer<typeof WorkflowPreviewRequestSchema>;
