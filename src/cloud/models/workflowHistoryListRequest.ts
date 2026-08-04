import { z } from 'zod';
import { apiObject } from '#/core';
/** A request to read all the workflow history entries for a specific workflow. */

export const WorkflowHistoryListRequestSchema = apiObject({
  /** The id of the workflow to read the history for. */
  workflowId: z.string().optional(),
});

export type WorkflowHistoryListRequest = z.infer<typeof WorkflowHistoryListRequestSchema>;
