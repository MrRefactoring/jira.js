import type { IssueBulkTransitionForWorkflow } from './issueBulkTransitionForWorkflow';

/** Bulk Transition Get Available Transitions Response. */
export interface BulkTransitionGetAvailableTransitions {
  /** List of available transitions for bulk transition operation for requested issues grouped by workflow */
  availableTransitions?: IssueBulkTransitionForWorkflow[];
  /** The end cursor for use in pagination. */
  endingBefore?: string;
  /** The start cursor for use in pagination. */
  startingAfter?: string;
}
