import type { JiraWorkflow } from './jiraWorkflow.js';
import type { JiraWorkflowStatus } from './jiraWorkflowStatus.js';

/** Details of the created workflows and statuses. */
export interface WorkflowCreateResponse {
  /** List of created statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of created workflows. */
  workflows?: JiraWorkflow[];
}
