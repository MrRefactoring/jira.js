import type { StatusWorkflowUsagePage } from './statusWorkflowUsagePage';

/** Workflows using the status. */
export interface StatusWorkflowUsageDTO {
  /** The status ID. */
  statusId?: string;
  workflows?: StatusWorkflowUsagePage;
}
