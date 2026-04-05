import { z } from 'zod';

/** A request to read a specific workflow version from history. */
export const WorkflowHistoryReadRequestSchema = z.object({
  version: z.number().optional(),
  workflowId: z.string().optional(),
});

export type WorkflowHistoryReadRequest = z.infer<typeof WorkflowHistoryReadRequestSchema>;
