import type { ProjectId } from './projectId';

/**
 * @deprecated See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
 *   for details.*
 *
 *   Use the optional `workflows.usages` expand to get additional information about the projects and issue types
 *   associated with the requested workflows.
 */
export interface ProjectIssueTypes {
  project?: ProjectId;
  /** IDs of the issue types */
  issueTypes?: string[];
}
