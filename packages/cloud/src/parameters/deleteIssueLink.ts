import { z } from 'zod';

export const DeleteIssueLinkSchema = z.object({
  /** The ID of the issue link. */
  linkId: z.string(),
});

export type DeleteIssueLink = z.input<typeof DeleteIssueLinkSchema>;
