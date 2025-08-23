import { z } from 'zod';

export const GetProjectUsagesForWorkflowParametersSchema = z.object({
  /** The workflow ID */
  workflowId: z.string(),
  /** The cursor for pagination */
  nextPageToken: z.string().optional(),
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults: z.number().int().optional(),
});

export type GetProjectUsagesForWorkflowParameters = z.infer<typeof GetProjectUsagesForWorkflowParametersSchema>;
