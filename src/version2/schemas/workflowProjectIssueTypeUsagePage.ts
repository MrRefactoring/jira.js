import { z } from 'zod';
import { WorkflowProjectIssueTypeUsageSchema } from './workflowProjectIssueTypeUsage';

/** A page of issue types. */
export const WorkflowProjectIssueTypeUsagePageSchema = z.object({
  /** Token for the next page of issue type usages. */
  nextPageToken: z.string().optional(),
  /** The list of issue types. */
  values: z.array(WorkflowProjectIssueTypeUsageSchema).optional(),
});

export type WorkflowProjectIssueTypeUsagePage = z.infer<typeof WorkflowProjectIssueTypeUsagePageSchema>;
