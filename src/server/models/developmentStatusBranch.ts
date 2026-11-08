import { z } from 'zod';
import { apiObject } from '#/core';
import { DevelopmentStatusRepositorySchema } from './developmentStatusRepository';

export const DevelopmentStatusBranchSchema = apiObject({
  name: z.string().optional(),
  url: z.string().optional(),
  createPullRequestUrl: z.string().optional(),
  repository: DevelopmentStatusRepositorySchema.optional(),
});

export type DevelopmentStatusBranch = z.infer<typeof DevelopmentStatusBranchSchema>;
