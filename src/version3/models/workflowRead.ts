import { JiraWorkflowStatus } from './jiraWorkflowStatus';
import { JiraWorkflow } from './jiraWorkflow';

/** Details of workflows and related statuses. */
export interface WorkflowRead {
  /** List of statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of workflows. */
  workflows?: JiraWorkflow[];
}
