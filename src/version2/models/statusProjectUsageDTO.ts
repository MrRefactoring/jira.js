import type { StatusProjectUsagePage } from './statusProjectUsagePage';

/** The projects using this status. */
export interface StatusProjectUsageDTO {
  projects?: StatusProjectUsagePage;
  /** The status ID. */
  statusId?: string;
}
