import { JiraWorkflow } from './jiraWorkflow';
import { JiraWorkflowStatus } from './jiraWorkflowStatus';

export interface WorkflowUpdateResponse {
  /** List of updated statuses. */
  statuses?: JiraWorkflowStatus[];
  /** If there is a [asynchronous task](#async-operations) operation, as a result of this update. */
  taskId?: string;
  /** List of updated workflows. */
  workflows?: JiraWorkflow[];
}
