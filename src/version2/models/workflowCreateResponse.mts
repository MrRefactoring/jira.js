import { JiraWorkflow } from './jiraWorkflow.mjs';
import { JiraWorkflowStatus } from './jiraWorkflowStatus.mjs';

/** Details of the created workflows and statuses. */
export interface WorkflowCreateResponse {
  /** List of created statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of created workflows. */
  workflows?: JiraWorkflow[];
}
