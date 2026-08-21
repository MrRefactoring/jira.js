import { z } from 'zod';
import { apiObject } from '#/core';

export const ComponentIssueCountsSchema = apiObject({
  issueCount: z.number().optional(),
  self: z.url().optional(),
});

export type ComponentIssueCounts = z.infer<typeof ComponentIssueCountsSchema>;
