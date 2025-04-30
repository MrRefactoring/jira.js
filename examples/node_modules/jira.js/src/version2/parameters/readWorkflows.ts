import type { ProjectAndIssueTypePair } from '../models';

export interface ReadWorkflows {
  /**
   * Return the new fields (`toStatusReference`/`links`) instead of the deprecated fields (`to`/`from`) for workflow
   * transition port mappings.
   */
  useTransitionLinksFormat?: boolean;
  /**
   * Return the new field `approvalConfiguration` instead of the deprecated status properties for approval
   * configuration.
   */
  useApprovalConfiguration?: boolean;
  /** The list of projects and issue types to query. */
  projectAndIssueTypes?: ProjectAndIssueTypePair[];
  /** The list of workflow IDs to query. */
  workflowIds?: string[];
  /** The list of workflow names to query. */
  workflowNames?: string[];
}
