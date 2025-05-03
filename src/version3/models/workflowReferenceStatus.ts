import type { ApprovalConfiguration } from './approvalConfiguration';
import type { WorkflowStatusLayout } from './workflowStatusLayout';

/** The statuses referenced in the workflow. */
export interface WorkflowReferenceStatus {
  approvalConfiguration?: ApprovalConfiguration;
  /** Indicates if the status is deprecated. */
  deprecated?: boolean;
  layout?: WorkflowStatusLayout;
  /** The properties associated with the status. */
  properties?: unknown;
  /** The reference of the status. */
  statusReference?: string;
}
