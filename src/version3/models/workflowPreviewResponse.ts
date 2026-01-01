import type { JiraWorkflowPreviewStatus } from './jiraWorkflowPreviewStatus';
import type { WorkflowPreview } from './workflowPreview';

/** The preview workflow response containing workflows and statuses. */
export interface WorkflowPreviewResponse {
  /** The list of statuses referenced by the workflows. */
  statuses?: JiraWorkflowPreviewStatus[];
  /** The list of workflows. The workflows are returned in the same order as specified in the request. */
  workflows?: WorkflowPreview[];
}
