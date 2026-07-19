import { z } from 'zod';

export const GetVersionUnresolvedIssuesSchema = z.object({
  /** The ID of the version. */
  id: z.string(),
});

export type GetVersionUnresolvedIssues = z.input<typeof GetVersionUnresolvedIssuesSchema>;
