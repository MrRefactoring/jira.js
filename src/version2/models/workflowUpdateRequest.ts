import type { WorkflowStatusUpdate } from './workflowStatusUpdate.js';
import type { WorkflowUpdate } from './workflowUpdate.js';

/** The update workflows payload. */
export interface WorkflowUpdateRequest {
  /** The statuses to associate with the workflows. */
  statuses: WorkflowStatusUpdate[];
  /** The details of the workflows to update. */
  workflows: WorkflowUpdate[];
}
