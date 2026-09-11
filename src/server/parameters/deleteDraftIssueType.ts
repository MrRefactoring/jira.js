import { z } from 'zod';

export const DeleteDraftIssueTypeSchema = z.object({
  /** The issue type to remove. */
  issueType: z.string(),
  /** The parent of the draft scheme. */
  id: z.number(),
});

export type DeleteDraftIssueType = z.input<typeof DeleteDraftIssueTypeSchema>;
