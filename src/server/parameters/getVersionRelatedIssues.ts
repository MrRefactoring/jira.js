import { z } from 'zod';

export const GetVersionRelatedIssuesSchema = z.object({
  /** ID of the version. */
  id: z.string(),
});

export type GetVersionRelatedIssues = z.input<typeof GetVersionRelatedIssuesSchema>;
