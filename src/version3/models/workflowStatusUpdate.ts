/** Details of the status being updated. */
export interface WorkflowStatusUpdate {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: 'TODO' | 'IN_PROGRESS' | 'DONE' | string;
  /** The reference of the status. */
  statusReference: string;
}
