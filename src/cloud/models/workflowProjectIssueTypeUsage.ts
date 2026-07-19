import { z } from 'zod';
import { apiObject } from '#/core';
/** The issue type. */

export const WorkflowProjectIssueTypeUsageSchema = apiObject({
  /** The ID of the issue type. */
  id: z.string().optional(),
});

export type WorkflowProjectIssueTypeUsage = z.infer<typeof WorkflowProjectIssueTypeUsageSchema>;
