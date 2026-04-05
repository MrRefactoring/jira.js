import { z } from 'zod';

export const IssueRankRequestSchema = z.object({
  issues: z.array(z.string()).optional(),
  rankAfterIssue: z.string().optional(),
  rankBeforeIssue: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type IssueRankRequest = z.infer<typeof IssueRankRequestSchema>;
