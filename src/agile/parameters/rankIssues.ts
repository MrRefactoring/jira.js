import { z } from 'zod';

export const RankIssuesSchema = z.object({
  issues: z.array(z.string()).optional(),
  rankAfterIssue: z.string().optional(),
  rankBeforeIssue: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type RankIssues = z.input<typeof RankIssuesSchema>;
