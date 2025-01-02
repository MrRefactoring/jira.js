import { IssueUpdateDetails } from '../models/index.mjs';

export interface DoTransition extends IssueUpdateDetails {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
}
