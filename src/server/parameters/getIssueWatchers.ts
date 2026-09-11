import { z } from 'zod';

export const GetIssueWatchersSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetIssueWatchers = z.input<typeof GetIssueWatchersSchema>;
