import type { ApprovalConfigurationPreview } from './approvalConfigurationPreview';
import type { WorkflowPreviewLayout } from './workflowPreviewLayout';

/** Details about a workflow status in preview context. */
export interface WorkflowPreviewStatus {
  approvalConfiguration?: ApprovalConfigurationPreview;
  /** Whether the status is deprecated. */
  deprecated?: boolean;
  layout?: WorkflowPreviewLayout;
  /** The reference of the status. */
  statusReference?: string;
}
