import { z } from 'zod';

/** The issue type. */
export const WorkflowProjectIssueTypeUsageSchema = z.object({
  /** The ID of the issue type. */
  id: z.string().optional(),
});

export type WorkflowProjectIssueTypeUsage = z.infer<typeof WorkflowProjectIssueTypeUsageSchema>;
