import type { StatusWorkflowUsagePage } from './statusWorkflowUsagePage';

/** Workflows using the status. */
export interface StatusWorkflowUsage {
  /** The status ID. */
  statusId?: string;
  workflows?: StatusWorkflowUsagePage;
}
