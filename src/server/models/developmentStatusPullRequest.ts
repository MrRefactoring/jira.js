import { z } from 'zod';
import { apiObject } from '#/core';
import { DevelopmentStatusPullRequestBranchSchema } from './developmentStatusPullRequestBranch';

export const DevelopmentStatusPullRequestSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
  status: z.string().optional(),
  source: DevelopmentStatusPullRequestBranchSchema.optional(),
  destination: DevelopmentStatusPullRequestBranchSchema.optional(),
});

export type DevelopmentStatusPullRequest = z.infer<typeof DevelopmentStatusPullRequestSchema>;
