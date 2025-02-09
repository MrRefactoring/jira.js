import { ProjectAndIssueTypePair } from './projectAndIssueTypePair';

export interface WorkflowReadRequest {
  /** The list of projects and issue types to query. */
  projectAndIssueTypes?: ProjectAndIssueTypePair[];
  /** The list of workflow IDs to query. */
  workflowIds?: string[];
  /** The list of workflow names to query. */
  workflowNames?: string[];
}
