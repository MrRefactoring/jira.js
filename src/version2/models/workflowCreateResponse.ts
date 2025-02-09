import { JiraWorkflow } from './jiraWorkflow';
import { JiraWorkflowStatus } from './jiraWorkflowStatus';

/**
 * Represents the response after creating workflows and statuses.
 *
 * @deprecated This interface is deprecated and will be removed in a future version. Use {@link WorkflowCreate} instead
 *   for handling workflow creation responses.
 */
export interface WorkflowCreateResponse {
  /** List of created statuses. */
  statuses?: JiraWorkflowStatus[];
  /** List of created workflows. */
  workflows?: JiraWorkflow[];
}
