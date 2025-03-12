import type { WorkflowSchemeUsagePage } from './workflowSchemeUsagePage';

/** Workflow schemes using the workflow. */
export interface WorkflowSchemeUsageDTO {
  /** The workflow ID. */
  workflowId?: string;
  workflowSchemes?: WorkflowSchemeUsagePage;
}
