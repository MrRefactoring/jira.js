import { z } from 'zod';

export const DeleteIssueTypeScreenSchemeSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
});

export type DeleteIssueTypeScreenScheme = z.input<typeof DeleteIssueTypeScreenSchemeSchema>;
