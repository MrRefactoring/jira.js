import { z } from 'zod';

/** A request to read all the workflow history entries for a specific workflow. */
export const WorkflowHistoryListRequestSchema = z.object({
  /** The id of the workflow to read the history for. */
  workflowId: z.string().optional(),
});

export type WorkflowHistoryListRequest = z.infer<typeof WorkflowHistoryListRequestSchema>;
