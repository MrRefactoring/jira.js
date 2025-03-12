import type { VersionUsageInCustomField } from './versionUsageInCustomField';

/** Various counts of issues within a version. */
export interface VersionIssueCounts {
  /** List of custom fields using the version. */
  customFieldUsage?: VersionUsageInCustomField[];
  /** Count of issues where a version custom field is set to the version. */
  issueCountWithCustomFieldsShowingVersion?: number;
  /** Count of issues where the `affectedVersion` is set to the version. */
  issuesAffectedCount?: number;
  /** Count of issues where the `fixVersion` is set to the version. */
  issuesFixedCount?: number;
  /** The URL of these count details. */
  self?: string;
}
