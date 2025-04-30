import type { StatusProjectIssueTypeUsagePage } from './statusProjectIssueTypeUsagePage';

/** The issue types using this status in a project. */
export interface StatusProjectIssueTypeUsage {
  issueTypes?: StatusProjectIssueTypeUsagePage;
  /** The project ID. */
  projectId?: string;
  /** The status ID. */
  statusId?: string;
}
