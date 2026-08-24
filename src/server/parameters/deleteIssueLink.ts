import { z } from 'zod';

export const DeleteIssueLinkSchema = z.object({
  /** The issue link id. */
  linkId: z.string(),
});

export type DeleteIssueLink = z.input<typeof DeleteIssueLinkSchema>;
