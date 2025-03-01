/**
 * Deprecated. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298)
 * for details.*
 *
 * The workflows that use this status. Only available if the `workflowUsages` expand is requested.
 */
export interface WorkflowUsages {
  /** Workflow ID. */
  workflowId?: string;
  /** Workflow name. */
  workflowName?: string;
}
