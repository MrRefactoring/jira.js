import type { StatusProjectUsagePage } from './statusProjectUsagePage';

/** The projects using this status. */
export interface StatusProjectUsage {
  projects?: StatusProjectUsagePage;
  /** The status ID. */
  statusId?: string;
}
