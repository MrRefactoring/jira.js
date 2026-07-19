import { z } from 'zod';

export const GetIssueLinkSchema = z.object({
  /** The ID of the issue link. */
  linkId: z.string(),
});

export type GetIssueLink = z.input<typeof GetIssueLinkSchema>;
