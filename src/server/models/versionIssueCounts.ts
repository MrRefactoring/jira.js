import { z } from 'zod';
import { apiObject } from '#/core';
import { VersionUsageInCustomFieldsSchema } from './versionUsageInCustomFields';

export const VersionIssueCountsSchema = apiObject({
  customFieldNames: z.array(VersionUsageInCustomFieldsSchema).optional(),
  issueCountWithCustomFieldsShowingVersion: z.number().optional(),
  issuesAffectedCount: z.number().optional(),
  issuesFixedCount: z.number().optional(),
  self: z.url().optional(),
});

export type VersionIssueCounts = z.infer<typeof VersionIssueCountsSchema>;
