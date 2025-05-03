import type { WorkflowStatusUpdate } from './workflowStatusUpdate';
import type { WorkflowUpdate } from './workflowUpdate';

/** The update workflows payload. */
export interface WorkflowUpdateRequest {
  /** The statuses to associate with the workflows. */
  statuses: WorkflowStatusUpdate[];
  /** The details of the workflows to update. */
  workflows: WorkflowUpdate[];
}
