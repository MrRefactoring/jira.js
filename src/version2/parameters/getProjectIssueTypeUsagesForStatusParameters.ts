import { z } from 'zod';

export const GetProjectIssueTypeUsagesForStatusParametersSchema = z.object({
  /** The statusId to fetch issue type usages for */
  statusId: z.string(),
  /** The projectId to fetch issue type usages for */
  projectId: z.string(),
  /** The cursor for pagination */
  nextPageToken: z.string().optional(),
  /** The maximum number of results to return. Must be an integer between 1 and 200. */
  maxResults: z.number().int().optional(),
});

export type GetProjectIssueTypeUsagesForStatusParameters = z.infer<
  typeof GetProjectIssueTypeUsagesForStatusParametersSchema
>;
