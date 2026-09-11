import { z } from 'zod';

export const DeleteIssueTypeSchemeSchema = z.object({
  /** The id of the issue type scheme to remove. */
  schemeId: z.string(),
});

export type DeleteIssueTypeScheme = z.input<typeof DeleteIssueTypeSchemeSchema>;
