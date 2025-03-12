import type { WorkflowCreate } from './workflowCreate';
import type { WorkflowScope } from './workflowScope';
import type { WorkflowStatusUpdate } from './workflowStatusUpdate';

/** The create workflows payload. */
export interface WorkflowCreateRequest {
  scope: WorkflowScope;
  /** The statuses to associate with the workflows. */
  statuses: WorkflowStatusUpdate[];
  /** The details of the workflows to create. */
  workflows: WorkflowCreate[];
}
