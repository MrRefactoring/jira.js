import { z } from 'zod';
import { apiObject } from '#/core';
/** The statuses associated with each workflow. */

export const StatusesPerWorkflowSchema = apiObject({
  /** The ID of the initial status for the workflow. */
  initialStatusId: z.string().optional(),
  /** The status IDs associated with the workflow. */
  statuses: z.array(z.string()).optional(),
  /** The ID of the workflow. */
  workflowId: z.string().optional(),
});

export type StatusesPerWorkflow = z.infer<typeof StatusesPerWorkflowSchema>;
