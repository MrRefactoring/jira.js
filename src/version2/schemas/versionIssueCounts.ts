import { z } from 'zod';
import { VersionUsageInCustomFieldSchema } from './versionUsageInCustomField';

/** Various counts of issues within a version. */
export const VersionIssueCountsSchema = z.object({
  /** List of custom fields using the version. */
  customFieldUsage: z.array(VersionUsageInCustomFieldSchema).optional(),
  /** Count of issues where a version custom field is set to the version. */
  issueCountWithCustomFieldsShowingVersion: z.number().int().optional(),
  /** Count of issues where the `affectedVersion` is set to the version. */
  issuesAffectedCount: z.number().int().optional(),
  /** Count of issues where the `fixVersion` is set to the version. */
  issuesFixedCount: z.number().int().optional(),
  /** The URL of these count details. */
  self: z.string().optional(),
});

export type VersionIssueCounts = z.infer<typeof VersionIssueCountsSchema>;
