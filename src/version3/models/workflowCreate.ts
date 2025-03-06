import type { JiraWorkflowStatus } from './jiraWorkflowStatus';
import type { JiraWorkflow } from './jiraWorkflow';

/** Details of the created workflows and statuses. */
export interface WorkflowCreate {
  /** List of created statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of created workflows. */
  workflows?: JiraWorkflow[];
}
