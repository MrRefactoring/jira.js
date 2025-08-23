import { z } from 'zod';

export const GetProjectsForIssueTypeScreenSchemeParametersSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.number().int(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  query: z.string().optional(),
});

export type GetProjectsForIssueTypeScreenSchemeParameters = z.infer<
  typeof GetProjectsForIssueTypeScreenSchemeParametersSchema
>;
