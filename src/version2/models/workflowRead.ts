import type { JiraWorkflow } from './jiraWorkflow.js';
import type { JiraWorkflowStatus } from './jiraWorkflowStatus.js';

/** Details of workflows and related statuses. */
export interface WorkflowRead {
  /** List of statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of workflows. */
  workflows?: JiraWorkflow[];
}
