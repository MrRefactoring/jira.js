import { z } from 'zod';

export const GetDraftIssueTypeSchema = z.object({
  /** The issue type to query. */
  issueType: z.string(),
  /** The id of the parent scheme. */
  id: z.number(),
});

export type GetDraftIssueType = z.input<typeof GetDraftIssueTypeSchema>;
