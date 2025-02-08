import { JiraWorkflowStatus } from './jiraWorkflowStatus';
import { JiraWorkflow } from './jiraWorkflow';

export interface WorkflowUpdate {
  /** List of updated statuses. */
  statuses?: JiraWorkflowStatus[];
  /** If there is a [asynchronous task](#async-operations) operation, as a result of this update. */
  taskId?: string;
  /** List of updated workflows. */
  workflows?: JiraWorkflow[];
}
