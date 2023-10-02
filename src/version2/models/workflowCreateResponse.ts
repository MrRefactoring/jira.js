import { JiraWorkflow } from './jiraWorkflow';
import { JiraWorkflowStatus } from './jiraWorkflowStatus';

/** Details of the created workflows and statuses. */
export interface WorkflowCreateResponse {
  /** List of created statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of created workflows. */
  workflows?: JiraWorkflow[];
}
