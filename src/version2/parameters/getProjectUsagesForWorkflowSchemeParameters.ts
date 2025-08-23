import { z } from 'zod';

export const GetProjectUsagesForWorkflowSchemeParametersSchema = z.object({
  /** The workflow scheme ID */
  workflowSchemeId: z.string(),
  /** The cursor for pagination */
  nextPageToken: z.string().optional(),
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults: z.number().int().optional(),
});

export type GetProjectUsagesForWorkflowSchemeParameters = z.infer<
  typeof GetProjectUsagesForWorkflowSchemeParametersSchema
>;
