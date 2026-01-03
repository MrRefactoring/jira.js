import type { WorkflowScope } from './workflowScope';

/** The statuses stored for the specified version. */
export interface WorkflowDocumentStatus {
  description?: string;
  id?: string;
  name?: string;
  scope?: WorkflowScope;
  statusCategory?: string;
  statusReference?: string;
}
