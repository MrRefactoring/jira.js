import type { JiraWorkflow } from './jiraWorkflow';
import type { JiraWorkflowStatus } from './jiraWorkflowStatus';

/** Details of workflows and related statuses. */
export interface WorkflowRead {
  /** List of statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of workflows. */
  workflows?: JiraWorkflow[];
}
