import { z } from 'zod';

export const GetCreateIssueMetaIssueTypesSchema = z.object({
  /** The ID or key of the project. */
  projectIdOrKey: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type GetCreateIssueMetaIssueTypes = z.input<typeof GetCreateIssueMetaIssueTypesSchema>;
