import { z } from 'zod';

export const GetWorkflowSchema = z.object({
  /** The ID of the workflow scheme. */
  id: z.number(),
  /**
   * The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified
   * workflow.
   */
  workflowName: z.string().optional(),
  /**
   * Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft
   * exists, the mapping from the workflow scheme is returned.
   */
  returnDraftIfExists: z.boolean().optional(),
});

export type GetWorkflow = z.input<typeof GetWorkflowSchema>;
