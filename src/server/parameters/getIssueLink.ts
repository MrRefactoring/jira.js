import { z } from 'zod';

export const GetIssueLinkSchema = z.object({
  /** The issue link id. */
  linkId: z.string(),
});

export type GetIssueLink = z.input<typeof GetIssueLinkSchema>;
