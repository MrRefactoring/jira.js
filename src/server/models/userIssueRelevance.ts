import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueInvolvementSchema } from './issueInvolvement';

export const UserIssueRelevanceSchema = apiObject({
  avatarUrls: z.record(z.string(), z.any()).optional(),
  displayName: z.string().optional(),
  emailAddress: z.string().optional(),
  highestIssueInvolvementRank: z.number().optional(),
  issueInvolvements: z.array(IssueInvolvementSchema).optional(),
  key: z.string().optional(),
  latestCommentCreationTime: z.number().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
});

export type UserIssueRelevance = z.infer<typeof UserIssueRelevanceSchema>;
