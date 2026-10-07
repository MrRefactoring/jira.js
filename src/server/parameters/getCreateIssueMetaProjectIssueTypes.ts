import { z } from 'zod';

export const GetCreateIssueMetaProjectIssueTypesSchema = z.object({
  /** Project id or key */
  projectIdOrKey: z.string(),
  /** How many results on the page should be included */
  maxResults: z.number().optional(),
  /** The page offset */
  startAt: z.number().optional(),
});

export type GetCreateIssueMetaProjectIssueTypes = z.input<typeof GetCreateIssueMetaProjectIssueTypesSchema>;
