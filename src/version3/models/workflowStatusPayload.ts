import type { WorkflowStatusLayoutPayload } from './workflowStatusLayoutPayload';
import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The statuses to be used in the workflow */
export interface WorkflowStatusPayload {
  layout?: WorkflowStatusLayoutPayload;
  pcri?: ProjectCreateResourceIdentifier;
  /** The properties of the workflow status. */
  properties?: {};
}
