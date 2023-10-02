import { WorkflowCreate } from './workflowCreate';
import { WorkflowScope } from './workflowScope';
import { WorkflowStatusUpdate } from './workflowStatusUpdate';

/** The create workflows payload. */
export interface WorkflowCreateRequest {
  scope: WorkflowScope;
  /** The statuses to associate with the workflows. */
  statuses: WorkflowStatusUpdate[];
  /** The details of the workflows to create. */
  workflows: WorkflowCreate[];
}
