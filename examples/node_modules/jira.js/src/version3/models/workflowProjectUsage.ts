import type { ProjectUsagePage } from './projectUsagePage';

/** Projects using the workflow. */
export interface WorkflowProjectUsage {
  projects?: ProjectUsagePage;
  /** The workflow ID. */
  workflowId?: string;
}
