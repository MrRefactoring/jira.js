import { z } from 'zod';

export const GetDraftWorkflowSchema = z.object({
  /** The ID of the workflow scheme that the draft belongs to. */
  id: z.number(),
  /**
   * The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified
   * workflow.
   */
  workflowName: z.string().optional(),
});

export type GetDraftWorkflow = z.input<typeof GetDraftWorkflowSchema>;
