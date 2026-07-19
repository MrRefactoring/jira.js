import { z } from 'zod';

export const DeleteIssueTypeSchemeSchema = z.object({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number(),
});

export type DeleteIssueTypeScheme = z.input<typeof DeleteIssueTypeSchemeSchema>;
