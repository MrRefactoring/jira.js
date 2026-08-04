import { z } from 'zod';

export const GetWorkflowProjectIssueTypeUsagesSchema = z.object({
  /** The workflow ID */
  workflowId: z.string(),
  /** The project ID */
  projectId: z.number(),
  /** The cursor for pagination */
  nextPageToken: z.string().optional(),
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults: z.number().optional(),
});

export type GetWorkflowProjectIssueTypeUsages = z.input<typeof GetWorkflowProjectIssueTypeUsagesSchema>;
