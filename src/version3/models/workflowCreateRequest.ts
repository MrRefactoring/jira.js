import { WorkflowScope } from './workflowScope';
import { WorkflowStatusUpdate } from './workflowStatusUpdate';
import { WorkflowCreate } from './workflowCreate';

/** The create workflows payload. */
export interface WorkflowCreateRequest {
  scope: WorkflowScope;
  /** The statuses to associate with the workflows. */
  statuses: WorkflowStatusUpdate[];
  /** The details of the workflows to create. */
  workflows: WorkflowCreate[];
}
