import type { WorkflowProjectIssueTypeUsagePage } from './workflowProjectIssueTypeUsagePage';

/** Issue types associated with the workflow for a project. */
export interface WorkflowProjectIssueTypeUsage {
  issueTypes?: WorkflowProjectIssueTypeUsagePage;
  /** The ID of the project. */
  projectId?: string;
  /** The ID of the workflow. */
  workflowId?: string;
}
