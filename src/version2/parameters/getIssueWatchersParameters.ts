import { z } from 'zod';

export const GetIssueWatchersParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type GetIssueWatchersParameters = z.infer<typeof GetIssueWatchersParametersSchema>;
