import { z } from 'zod';

export const GetRemoteIssueLinksSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Global id of the remote issue link */
  globalId: z.string().optional(),
});

export type GetRemoteIssueLinks = z.input<typeof GetRemoteIssueLinksSchema>;
