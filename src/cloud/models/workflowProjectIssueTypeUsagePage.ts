import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowProjectIssueTypeUsageSchema } from './workflowProjectIssueTypeUsage';
/** A page of issue types. */

export const WorkflowProjectIssueTypeUsagePageSchema = apiObject({
  /** Token for the next page of issue type usages. */
  nextPageToken: z.string().nullish(),
  /** The list of issue types. */
  values: z.array(WorkflowProjectIssueTypeUsageSchema).optional(),
});

export type WorkflowProjectIssueTypeUsagePage = z.infer<typeof WorkflowProjectIssueTypeUsagePageSchema>;
