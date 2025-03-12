import type { ProjectUsagePage } from './projectUsagePage';

/** Projects using the workflow. */
export interface WorkflowProjectUsageDTO {
  projects?: ProjectUsagePage;
  /** The workflow ID. */
  workflowId?: string;
}
