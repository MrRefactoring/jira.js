import { IssueUpdateDetails } from '../models';

export interface DoTransition extends IssueUpdateDetails {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}
