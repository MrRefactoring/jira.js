import { JiraWorkflow } from './jiraWorkflow.mjs';
import { JiraWorkflowStatus } from './jiraWorkflowStatus.mjs';

/** Details of workflows and related statuses. */
export interface WorkflowRead {
  /** List of statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of workflows. */
  workflows?: JiraWorkflow[];
}
