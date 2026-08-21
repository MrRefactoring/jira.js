import { z } from 'zod';

export const GetCreateIssueMetaFieldsSchema = z.object({
  /** Issue type id */
  issueTypeId: z.string(),
  /** Project id or key */
  projectIdOrKey: z.string(),
  /** How many results on the page should be included */
  maxResults: z.string().optional(),
  /** The page offset */
  startAt: z.string().optional(),
});

export type GetCreateIssueMetaFields = z.input<typeof GetCreateIssueMetaFieldsSchema>;
