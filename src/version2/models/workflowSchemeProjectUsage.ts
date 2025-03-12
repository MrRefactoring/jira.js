import type { ProjectUsagePage } from './projectUsagePage';

/** Projects using the workflow scheme. */
export interface WorkflowSchemeProjectUsage {
  projects?: ProjectUsagePage;
  /** The workflow scheme ID. */
  workflowSchemeId?: string;
}
