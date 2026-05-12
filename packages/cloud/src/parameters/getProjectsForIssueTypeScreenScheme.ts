import { z } from 'zod';

export const GetProjectsForIssueTypeScreenSchemeSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.number(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  query: z.string().optional(),
});

export type GetProjectsForIssueTypeScreenScheme = z.input<typeof GetProjectsForIssueTypeScreenSchemeSchema>;
