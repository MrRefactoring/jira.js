import { VersionUsageInCustomField } from './versionUsageInCustomField';

export interface VersionIssueCounts {
    self: string;
    issuesFixedCount: number;
    issuesAffectedCount: number;
    issueCountWithCustomFieldsShowingVersion: number;
    customFieldUsage: VersionUsageInCustomField[];
}
