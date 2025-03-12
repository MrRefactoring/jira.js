import type { WorkflowCreate, WorkflowScope, WorkflowStatusUpdate } from '../models';

/** The create workflows payload. */
export interface CreateWorkflows {
  scope: WorkflowScope;
  /** The statuses to associate with the workflows. */
  statuses: WorkflowStatusUpdate[];
  /** The details of the workflows to create. */
  workflows: WorkflowCreate[];
}
