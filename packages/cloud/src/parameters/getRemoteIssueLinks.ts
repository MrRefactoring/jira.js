import { z } from 'zod';

export const GetRemoteIssueLinksSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The global ID of the remote issue link. */
  globalId: z.string().optional(),
});

export type GetRemoteIssueLinks = z.input<typeof GetRemoteIssueLinksSchema>;
