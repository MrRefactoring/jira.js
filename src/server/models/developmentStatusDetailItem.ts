import { z } from 'zod';
import { apiObject } from '#/core';
import { DevelopmentStatusRepositorySchema } from './developmentStatusRepository';
import { DevelopmentStatusBranchSchema } from './developmentStatusBranch';
import { DevelopmentStatusPullRequestSchema } from './developmentStatusPullRequest';

export const DevelopmentStatusDetailItemSchema = apiObject({
  repositories: z.array(DevelopmentStatusRepositorySchema).optional(),
  branches: z.array(DevelopmentStatusBranchSchema).optional(),
  pullRequests: z.array(DevelopmentStatusPullRequestSchema).optional(),
});

export type DevelopmentStatusDetailItem = z.infer<typeof DevelopmentStatusDetailItemSchema>;
