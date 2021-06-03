import { WorkflowStatusProperties } from './workflowStatusProperties';

/** Details of a workflow status. */
export interface WorkflowStatus {
  /** The ID of the issue status. */
  id: string;
  /** The name of the status in the workflow. */
  name: string;
  properties?: WorkflowStatusProperties;
}
