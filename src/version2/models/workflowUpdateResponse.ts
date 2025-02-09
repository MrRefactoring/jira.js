import { JiraWorkflow } from './jiraWorkflow';
import { JiraWorkflowStatus } from './jiraWorkflowStatus';

/**
 * Represents the response after updating a workflow.
 *
 * @deprecated This interface is deprecated and will be removed in a future version. Use {@link WorkflowUpdate} instead,
 *   which is the preferred way to handle workflow updates.
 */
export interface WorkflowUpdateResponse {
  /** List of updated statuses. */
  statuses?: JiraWorkflowStatus[];
  /** If there is a [asynchronous task](#async-operations) operation, as a result of this update. */
  taskId?: string;
  /** List of updated workflows. */
  workflows?: JiraWorkflow[];
}
