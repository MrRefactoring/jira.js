import { z } from 'zod';

export const GetCreateIssueMetaFieldsSchema = z.object({
  /** Issue type id */
  issueTypeId: z.string(),
  /** Project id or key */
  projectIdOrKey: z.string(),
  /** How many results on the page should be included */
  maxResults: z.number().optional(),
  /** The page offset */
  startAt: z.number().optional(),
});

export type GetCreateIssueMetaFields = z.input<typeof GetCreateIssueMetaFieldsSchema>;
