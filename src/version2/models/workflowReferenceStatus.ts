import { WorkflowStatusLayout } from './workflowStatusLayout';

/** The statuses referenced in the workflow. */
export interface WorkflowReferenceStatus {
  /** Indicates if the status is deprecated. */
  deprecated?: boolean;
  layout?: WorkflowStatusLayout;
  /** The properties associated with the status. */
  properties?: {};
  /** The reference of the status. */
  statusReference?: string;
}
