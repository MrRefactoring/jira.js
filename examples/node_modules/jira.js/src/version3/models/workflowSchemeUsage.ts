import type { WorkflowSchemeUsagePage } from './workflowSchemeUsagePage';

/** Workflow schemes using the workflow. */
export interface WorkflowSchemeUsage {
  /** The workflow ID. */
  workflowId?: string;
  workflowSchemes?: WorkflowSchemeUsagePage;
}
