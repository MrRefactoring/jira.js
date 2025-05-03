import type { IssueTransitionStatus } from './issueTransitionStatus';

export interface SimplifiedIssueTransition {
  to?: IssueTransitionStatus;
  /** The unique ID of the transition. */
  transitionId?: number;
  /** The name of the transition. */
  transitionName?: string;
}
