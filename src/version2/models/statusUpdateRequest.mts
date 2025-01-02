import type { StatusUpdate } from './statusUpdate.mjs';

/** The list of statuses that will be updated. */
export interface StatusUpdateRequest {
  /** The list of statuses that will be updated. */
  statuses?: StatusUpdate[];
}
