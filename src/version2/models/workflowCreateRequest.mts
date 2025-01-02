import { WorkflowCreate } from './workflowCreate.mjs';
import { WorkflowScope } from './workflowScope.mjs';
import { WorkflowStatusUpdate } from './workflowStatusUpdate.mjs';

/** The create workflows payload. */
export interface WorkflowCreateRequest {
  scope: WorkflowScope;
  /** The statuses to associate with the workflows. */
  statuses: WorkflowStatusUpdate[];
  /** The details of the workflows to create. */
  workflows: WorkflowCreate[];
}
