import { z } from 'zod';

export const GetIssueWatchersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type GetIssueWatchers = z.input<typeof GetIssueWatchersSchema>;
