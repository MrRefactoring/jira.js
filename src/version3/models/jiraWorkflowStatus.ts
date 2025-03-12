import type { WorkflowScope } from './workflowScope';

/** Details of a status. */
export interface JiraWorkflowStatus {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  scope?: WorkflowScope;
  /** The category of the status. */
  statusCategory?: 'TODO' | 'IN_PROGRESS' | 'DONE' | string;
  /** The reference of the status. */
  statusReference?: string;
}
