import { z } from 'zod';

export const GetIssueTypeSchemeForProjectsSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * The list of project IDs. To include multiple project IDs, provide an ampersand-separated list. For example,
   * `projectId=10000&projectId=10001`.
   */
  projectId: z.array(z.number()),
});

export type GetIssueTypeSchemeForProjects = z.input<typeof GetIssueTypeSchemeForProjectsSchema>;
