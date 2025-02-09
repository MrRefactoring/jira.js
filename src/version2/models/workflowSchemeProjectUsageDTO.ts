import { ProjectUsagePage } from './projectUsagePage';

/** Projects using the workflow scheme. */
export interface WorkflowSchemeProjectUsageDTO {
  projects?: ProjectUsagePage;
  /** The workflow scheme ID. */
  workflowSchemeId?: string;
}
