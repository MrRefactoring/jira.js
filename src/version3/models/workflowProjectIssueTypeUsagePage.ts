import type { WorkflowProjectIssueTypeUsage } from './workflowProjectIssueTypeUsage';

/** A page of issue types. */
export interface WorkflowProjectIssueTypeUsagePage {
  /** Token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of issue types. */
  values?: WorkflowProjectIssueTypeUsage[];
}
