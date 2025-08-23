import { z } from 'zod';

export const GetIssueTypeSchemeForProjectsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * The list of project IDs. To include multiple project IDs, provide an ampersand-separated list. For example,
   * `projectId=10000&projectId=10001`.
   */
  projectId: z.array(z.number().int()),
});

export type GetIssueTypeSchemeForProjectsParameters = z.infer<typeof GetIssueTypeSchemeForProjectsParametersSchema>;
