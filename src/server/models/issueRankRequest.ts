import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueRankRequestSchema = apiObject({
  issues: z.array(z.string()).optional(),
  rankAfterIssue: z.string().optional(),
  rankBeforeIssue: z.string().optional(),
  rankCustomFieldId: z.number().optional(),
});

export type IssueRankRequest = z.infer<typeof IssueRankRequestSchema>;
