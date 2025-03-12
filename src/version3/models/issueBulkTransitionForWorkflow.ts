import type { SimplifiedIssueTransition } from './simplifiedIssueTransition';

export interface IssueBulkTransitionForWorkflow {
  /** Indicates whether all the transitions of this workflow are available in the transitions list or not. */
  isTransitionsFiltered?: boolean;
  /** List of issue keys from the request which are associated with this workflow. */
  issues?: string[];
  /**
   * List of transitions available for issues from the request which are associated with this workflow.
   *
   * _This list includes only those transitions that are common across the issues in this workflow and do not involve
   * any additional field updates._*
   */
  transitions?: SimplifiedIssueTransition[];
}
