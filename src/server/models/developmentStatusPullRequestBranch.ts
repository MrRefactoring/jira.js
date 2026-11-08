import { z } from 'zod';
import { apiObject } from '#/core';
import { DevelopmentStatusRepositorySchema } from './developmentStatusRepository';

export const DevelopmentStatusPullRequestBranchSchema = apiObject({
  branch: z.string().optional(),
  url: z.string().optional(),
  repository: DevelopmentStatusRepositorySchema.optional(),
});

export type DevelopmentStatusPullRequestBranch = z.infer<typeof DevelopmentStatusPullRequestBranchSchema>;
