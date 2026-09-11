import { z } from 'zod';
import { apiObject } from '#/core';

export const VersionUnresolvedIssueCountsSchema = apiObject({
  issuesUnresolvedCount: z.number().optional(),
  self: z.url().optional(),
});

export type VersionUnresolvedIssueCounts = z.infer<typeof VersionUnresolvedIssueCountsSchema>;
