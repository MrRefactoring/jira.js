import type { WorkflowCreate } from './workflowCreate.js';
import type { WorkflowScope } from './workflowScope.js';
import type { WorkflowStatusUpdate } from './workflowStatusUpdate.js';

/** The create workflows payload. */
export interface WorkflowCreateRequest {
  scope: WorkflowScope;
  /** The statuses to associate with the workflows. */
  statuses: WorkflowStatusUpdate[];
  /** The details of the workflows to create. */
  workflows: WorkflowCreate[];
}
