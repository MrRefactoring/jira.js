import { z } from 'zod';

export const GetIssueWorklogSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetIssueWorklog = z.input<typeof GetIssueWorklogSchema>;
