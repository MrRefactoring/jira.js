import { z } from 'zod';
import { apiObject } from '#/core';

/** The copy workflow payload. */
export const WorkflowCopyRequestSchema = apiObject({
  /** The description of the new workflow to create. Defaults to an empty description. */
  description: z.string().max(2048, 'description must be at most 2048 characters').optional(),
  /** The ID of the workflow to copy. */
  workflowId: z.string().max(255, 'workflowId must be at most 255 characters'),
  /** The name of the new workflow to create. */
  workflowName: z.string().max(255, 'workflowName must be at most 255 characters'),
});

export type WorkflowCopyRequest = z.infer<typeof WorkflowCopyRequestSchema>;
