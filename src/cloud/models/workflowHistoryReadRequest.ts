import { z } from 'zod';
import { apiObject } from '#/core';
/** A request to read a specific workflow version from history. */

export const WorkflowHistoryReadRequestSchema = apiObject({
  version: z.number().optional(),
  workflowId: z.string().optional(),
});

export type WorkflowHistoryReadRequest = z.infer<typeof WorkflowHistoryReadRequestSchema>;
