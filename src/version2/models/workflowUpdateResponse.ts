import type { JiraWorkflow } from './jiraWorkflow.js';
import type { JiraWorkflowStatus } from './jiraWorkflowStatus.js';

export interface WorkflowUpdateResponse {
  /** List of updated statuses. */
  statuses?: JiraWorkflowStatus[];
  /** If there is a [asynchronous task](#async-operations) operation, as a result of this update. */
  taskId?: string;
  /** List of updated workflows. */
  workflows?: JiraWorkflow[];
}
